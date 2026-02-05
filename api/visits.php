<?php
// api/visits.php
// ==============================================
// CONTADOR GLOBAL DE VISITAS - Impulsora de Recuperación Crediticia
// ==============================================

// Configuración
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permitir llamadas desde cualquier dominio
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar solicitudes OPTIONS (para CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Archivo donde guardamos los datos
$data_file = __DIR__ . '/visits_data.json';
$lock_file = __DIR__ . '/visits_data.lock';

// Función para obtener ID único del visitante (privacidad)
function getVisitorId() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    $acceptLanguage = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? 'unknown';
    
    // Crear un hash único pero anónimo
    $uniqueString = $ip . $userAgent . $acceptLanguage;
    return hash('sha256', $uniqueString);
}

// Función para bloquear archivo (evitar escrituras simultáneas)
function acquireLock($lock_file) {
    $max_wait = 5; // segundos máximo de espera
    $start = time();
    
    while (time() - $start < $max_wait) {
        if (!file_exists($lock_file)) {
            file_put_contents($lock_file, getmypid());
            return true;
        }
        usleep(100000); // Esperar 100ms
    }
    return false;
}

function releaseLock($lock_file) {
    if (file_exists($lock_file)) {
        unlink($lock_file);
    }
}

// Función para cargar datos
function loadData($data_file) {
    if (!file_exists($data_file)) {
        return [
            'total_visits' => 0,
            'unique_visitors' => [],
            'daily_stats' => [],
            'monthly_stats' => [],
            'all_time_stats' => [
                'start_date' => date('Y-m-d'),
                'peak_day' => ['date' => '', 'count' => 0]
            ],
            'last_updated' => date('Y-m-d H:i:s')
        ];
    }
    
    $content = file_get_contents($data_file);
    if ($content === false) {
        return null;
    }
    
    $data = json_decode($content, true);
    return $data ?: null;
}

// Función para guardar datos
function saveData($data_file, $data) {
    $data['last_updated'] = date('Y-m-d H:i:s');
    $json = json_encode($data, JSON_PRETTY_PRINT);
    return file_put_contents($data_file, $json) !== false;
}

// Función para registrar visita
function registerVisit($visitor_id, &$data) {
    $today = date('Y-m-d');
    $current_month = date('Y-m');
    $current_hour = date('H');
    
    // 1. Incrementar total
    $data['total_visits']++;
    
    // 2. Manejar visitantes únicos
    if (!in_array($visitor_id, $data['unique_visitors'])) {
        $data['unique_visitors'][] = $visitor_id;
        
        // Mantener solo los últimos 10,000 visitantes únicos (para no hacer el archivo muy grande)
        if (count($data['unique_visitors']) > 10000) {
            $data['unique_visitors'] = array_slice($data['unique_visitors'], -10000);
        }
    }
    
    // 3. Estadísticas diarias
    if (!isset($data['daily_stats'][$today])) {
        $data['daily_stats'][$today] = [
            'visits' => 0,
            'unique' => [],
            'hourly' => array_fill(0, 24, 0)
        ];
    }
    
    $data['daily_stats'][$today]['visits']++;
    
    // Agregar a únicos del día
    if (!in_array($visitor_id, $data['daily_stats'][$today]['unique'])) {
        $data['daily_stats'][$today]['unique'][] = $visitor_id;
    }
    
    // Registrar por hora
    $data['daily_stats'][$today]['hourly'][(int)$current_hour]++;
    
    // 4. Estadísticas mensuales
    if (!isset($data['monthly_stats'][$current_month])) {
        $data['monthly_stats'][$current_month] = 0;
    }
    $data['monthly_stats'][$current_month]++;
    
    // 5. Actualizar día pico
    if ($data['daily_stats'][$today]['visits'] > $data['all_time_stats']['peak_day']['count']) {
        $data['all_time_stats']['peak_day'] = [
            'date' => $today,
            'count' => $data['daily_stats'][$today]['visits']
        ];
    }
    
    // 6. Limpiar datos antiguos (mantener solo último año)
    $one_year_ago = date('Y-m-d', strtotime('-1 year'));
    foreach ($data['daily_stats'] as $date => $stats) {
        if ($date < $one_year_ago) {
            unset($data['daily_stats'][$date]);
        }
    }
    
    // Limpiar meses antiguos
    $one_year_ago_month = date('Y-m', strtotime('-1 year'));
    foreach ($data['monthly_stats'] as $month => $count) {
        if ($month < $one_year_ago_month) {
            unset($data['monthly_stats'][$month]);
        }
    }
    
    return true;
}

// Función para obtener estadísticas públicas
function getPublicStats($data) {
    $today = date('Y-m-d');
    $yesterday = date('Y-m-d', strtotime('-1 day'));
    $current_month = date('Y-m');
    
    $today_visits = $data['daily_stats'][$today]['visits'] ?? 0;
    $yesterday_visits = $data['daily_stats'][$yesterday]['visits'] ?? 0;
    $month_visits = $data['monthly_stats'][$current_month] ?? 0;
    
    // Calcular promedio diario
    $daily_average = 0;
    if (!empty($data['daily_stats'])) {
        $total_days = count($data['daily_stats']);
        $total_recent_visits = array_sum(array_column($data['daily_stats'], 'visits'));
        $daily_average = $total_days > 0 ? round($total_recent_visits / $total_days) : 0;
    }
    
    return [
        'total' => $data['total_visits'],
        'unique' => count($data['unique_visitors']),
        'today' => $today_visits,
        'yesterday' => $yesterday_visits,
        'month' => $month_visits,
        'daily_average' => $daily_average,
        'peak_day' => $data['all_time_stats']['peak_day'],
        'start_date' => $data['all_time_stats']['start_date'],
        'last_updated' => $data['last_updated']
    ];
}

// ==============================================
// PROCESAR LA SOLICITUD
// ==============================================

try {
    // Adquirir bloqueo para evitar corrupción de datos
    if (!acquireLock($lock_file)) {
        throw new Exception('No se pudo adquirir bloqueo');
    }
    
    // Cargar datos existentes
    $data = loadData($data_file);
    if ($data === null) {
        throw new Exception('Error al cargar datos');
    }
    
    // Obtener tipo de solicitud
    $action = $_GET['action'] ?? 'register';
    $visitor_id = getVisitorId();
    
    // Registrar visita si es acción por defecto
    if ($action === 'register') {
        registerVisit($visitor_id, $data);
    }
    
    // Guardar datos actualizados
    if (!saveData($data_file, $data)) {
        throw new Exception('Error al guardar datos');
    }
    
    // Obtener estadísticas para respuesta
    $response = [
        'success' => true,
        'data' => getPublicStats($data),
        'timestamp' => date('Y-m-d H:i:s'),
        'visitor_id_hash' => substr($visitor_id, 0, 16) // Solo parte del hash para debugging
    ];
    
    // Si es solo consulta (no registrar), indicarlo
    if ($action === 'get') {
        $response['action'] = 'get_only';
    } else {
        $response['action'] = 'registered';
    }
    
    // Liberar bloqueo
    releaseLock($lock_file);
    
    // Enviar respuesta
    echo json_encode($response, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    // Liberar bloqueo en caso de error
    if (file_exists($lock_file)) {
        releaseLock($lock_file);
    }
    
    // Respuesta de error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s'),
        'fallback_data' => [
            'total' => 0,
            'unique' => 0,
            'today' => 0,
            'yesterday' => 0
        ]
    ]);
}
?>