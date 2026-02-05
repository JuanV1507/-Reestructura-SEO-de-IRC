<?php
// Configuración
$destinatario = "Thorrobledo@ircdebtrecovery.com";
$tiempo_minimo_envio = 3; // Tiempo mínimo en segundos para prevenir envíos automáticos
$ip_limit_per_hour = 3; // Límite de envíos por IP por hora

// Iniciar sesión para tokens CSRF
session_start();

// Función para obtener el idioma actual
function obtenerIdioma() {
    if (isset($_GET['lang'])) {
        return $_GET['lang'];
    }
    if (isset($_SESSION['language'])) {
        return $_SESSION['language'];
    }
    return 'es'; // Idioma por defecto
}

// Función para mensajes de error por idioma
function obtenerMensajeError($codigo, $idioma = 'es') {
    $mensajes = [
        'token_invalido' => [
            'es' => 'Token de seguridad inválido.',
            'en' => 'Invalid security token.',
            'zh' => '安全令牌无效。'
        ],
        'demasiado_rapido' => [
            'es' => 'Por favor, espera unos segundos antes de enviar otro mensaje.',
            'en' => 'Please wait a few seconds before sending another message.',
            'zh' => '请在发送另一条消息前等待几秒钟。'
        ],
        'limite_excedido' => [
            'es' => 'Has excedido el límite de envíos. Por favor, intenta más tarde.',
            'en' => 'You have exceeded the sending limit. Please try again later.',
            'zh' => '您已超过发送限制。请稍后再试。'
        ],
        'campos_requeridos' => [
            'es' => 'Todos los campos son obligatorios.',
            'en' => 'All fields are required.',
            'zh' => '所有字段都是必需的。'
        ],
        'nombre_invalido' => [
            'es' => 'El nombre debe tener entre 2 y 100 caracteres.',
            'en' => 'Name must be between 2 and 100 characters.',
            'zh' => '名称必须在2到100个字符之间。'
        ],
        'email_invalido' => [
            'es' => 'El correo electrónico no es válido.',
            'en' => 'The email address is not valid.',
            'zh' => '电子邮件地址无效。'
        ],
        'asunto_invalido' => [
            'es' => 'El asunto debe tener entre 5 y 200 caracteres.',
            'en' => 'Subject must be between 5 and 200 characters.',
            'zh' => '主题必须在5到200个字符之间。'
        ],
        'mensaje_invalido' => [
            'es' => 'El mensaje debe tener entre 10 y 2000 caracteres.',
            'en' => 'Message must be between 10 and 2000 characters.',
            'zh' => '消息必须在10到2000个字符之间。'
        ]
    ];
    
    return $mensajes[$codigo][$idioma] ?? $mensajes[$codigo]['es'];
}

// Obtener idioma actual
$idioma_actual = obtenerIdioma();

// Validar honeypot (campo oculto que solo los bots llenan)
if (!empty($_POST['honeypot'])) {
    // Simular éxito para bots
    header("Location: index.html?lang=$idioma_actual&success=1");
    exit;
}

// Verificar token CSRF (compatible con versión cliente)
if (empty($_POST['csrf_token'])) {
    $mensaje = obtenerMensajeError('token_invalido', $idioma_actual);
    echo "<script>alert('❌ $mensaje'); window.location.href='index.html?lang=$idioma_actual';</script>";
    exit;
}

// Verificar tiempo de envío (prevenir bots rápidos)
if (isset($_SESSION['ultimo_envio']) && (time() - $_SESSION['ultimo_envio']) < $tiempo_minimo_envio) {
    $mensaje = obtenerMensajeError('demasiado_rapido', $idioma_actual);
    echo "<script>alert('⏳ $mensaje'); window.location.href='index.html?lang=$idioma_actual';</script>";
    exit;
}

// Limitar envíos por IP (sistema ligero)
$ip = $_SERVER['REMOTE_ADDR'];
$ip_hash = md5($ip);
$cache_dir = 'ip_cache';

if (!is_dir($cache_dir)) {
    mkdir($cache_dir, 0755, true);
}

$cache_file = "$cache_dir/$ip_hash.json";
$hora_actual = time();

if (file_exists($cache_file)) {
    $data = json_decode(file_get_contents($cache_file), true);
    
    // Limpiar entradas antiguas (más de 1 hora)
    $data = array_filter($data, function($timestamp) use ($hora_actual) {
        return ($hora_actual - $timestamp) < 3600;
    });
    
    if (count($data) >= $ip_limit_per_hour) {
        $mensaje = obtenerMensajeError('limite_excedido', $idioma_actual);
        echo "<script>alert('⚠️ $mensaje'); window.location.href='index.html?lang=$idioma_actual';</script>";
        exit;
    }
    
    $data[] = $hora_actual;
} else {
    $data = [$hora_actual];
}

file_put_contents($cache_file, json_encode($data));

// Validar campos obligatorios
$campos_requeridos = ['nombre', 'email', 'asunto', 'mensaje'];
foreach ($campos_requeridos as $campo) {
    if (empty($_POST[$campo])) {
        $mensaje = obtenerMensajeError('campos_requeridos', $idioma_actual);
        echo "<script>alert('❌ $mensaje'); window.location.href='index.html?lang=$idioma_actual';</script>";
        exit;
    }
}

// Sanitizar y validar datos
$nombre = trim(htmlspecialchars($_POST['nombre'], ENT_QUOTES, 'UTF-8'));
$email = trim($_POST['email']);
$asunto = trim(htmlspecialchars($_POST['asunto'], ENT_QUOTES, 'UTF-8'));
$mensaje = trim(htmlspecialchars($_POST['mensaje'], ENT_QUOTES, 'UTF-8'));

// Validaciones de longitud
if (strlen($nombre) < 2 || strlen($nombre) > 100) {
    $error = obtenerMensajeError('nombre_invalido', $idioma_actual);
    echo "<script>alert('❌ $error'); window.location.href='index.html?lang=$idioma_actual';</script>";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $error = obtenerMensajeError('email_invalido', $idioma_actual);
    echo "<script>alert('❌ $error'); window.location.href='index.html?lang=$idioma_actual';</script>";
    exit;
}

if (strlen($asunto) < 5 || strlen($asunto) > 200) {
    $error = obtenerMensajeError('asunto_invalido', $idioma_actual);
    echo "<script>alert('❌ $error'); window.location.href='index.html?lang=$idioma_actual';</script>";
    exit;
}

if (strlen($mensaje) < 10 || strlen($mensaje) > 2000) {
    $error = obtenerMensajeError('mensaje_invalido', $idioma_actual);
    echo "<script>alert('❌ $error'); window.location.href='index.html?lang=$idioma_actual';</script>";
    exit;
}

// Detección simple de spam (sin bloquear, solo registrar)
function contienePatronesSpam($texto) {
    $patrones = [
        '/\[url=/i',
        '/<a href=/i',
        '/viagra|cialis|levitra/i',
        '/casino|poker|betting|gambling/i',
        '/nigerian.*prince|inheritance.*million/i',
        '/bit\.ly|goo\.gl|tinyurl|ow\.ly/i'
    ];
    
    foreach ($patrones as $patron) {
        if (preg_match($patron, $texto)) {
            return true;
        }
    }
    return false;
}

// Registrar spam potencial (sin bloquear al usuario)
$texto_completo = $nombre . ' ' . $asunto . ' ' . $mensaje;
if (contienePatronesSpam($texto_completo)) {
    $log_file = 'spam_log.txt';
    $log_entry = date('Y-m-d H:i:s') . " | IP: $ip | Email: $email | Idioma: $idioma_actual\n";
    @file_put_contents($log_file, $log_entry, FILE_APPEND);
}

// Preparar y enviar email
$titulo = "Nuevo mensaje de contacto: " . mb_encode_mimeheader($asunto, 'UTF-8');
$contenido = "Nombre: $nombre\n";
$contenido .= "Email: $email\n";
$contenido .= "IP: $ip\n";
$contenido .= "Idioma: $idioma_actual\n";
$contenido .= "Fecha: " . date('Y-m-d H:i:s') . "\n\n";
$contenido .= "Mensaje:\n$mensaje\n\n";
$contenido .= "--\nEste mensaje fue enviado desde el formulario de contacto.";

$cabeceras = "From: " . mb_encode_mimeheader($nombre, 'UTF-8') . " <$email>\r\n";
$cabeceras .= "Reply-To: $email\r\n";
$cabeceras .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$cabeceras .= "MIME-Version: 1.0\r\n";
$cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Enviar email
if (mail($destinatario, $titulo, $contenido, $cabeceras)) {
    $_SESSION['ultimo_envio'] = time();
    
    // Mensajes de éxito por idioma
    $mensajes_exito = [
        'es' => '✅ Mensaje enviado correctamente.',
        'en' => '✅ Message sent successfully.',
        'zh' => '✅ 消息发送成功。'
    ];
    
    $mensaje_exito = $mensajes_exito[$idioma_actual] ?? $mensajes_exito['es'];
    echo "<script>alert('$mensaje_exito'); window.location.href='index.html?lang=$idioma_actual';</script>";
} else {
    // Mensajes de error por idioma
    $mensajes_error = [
        'es' => '❌ Hubo un error al enviar el mensaje. Inténtalo más tarde.',
        'en' => '❌ There was an error sending the message. Please try again later.',
        'zh' => '❌ 发送消息时出错。请稍后再试。'
    ];
    
    $mensaje_error = $mensajes_error[$idioma_actual] ?? $mensajes_error['es'];
    echo "<script>alert('$mensaje_error'); window.location.href='index.html?lang=$idioma_actual';</script>";
}

// Limpiar caché antigua (una vez cada 100 ejecuciones para eficiencia)
if (rand(1, 100) === 1) {
    $files = glob("$cache_dir/*.json");
    foreach ($files as $file) {
        if (filemtime($file) < time() - 86400) {
            unlink($file);
        }
    }
}
?>