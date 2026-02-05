/**
 * CONTADOR GLOBAL DE VISITAS CON PHP
 * Para Impulsora de Recuperación Crediticia
 * Versión 2.0 - Con backend PHP
 */

class GlobalVisitCounter {
    constructor() {
        // Configuración
        this.config = {
            apiUrl: 'api/visits.php',
            updateInterval: 30000, // 30 segundos para actualizar UI
            sessionTimeout: 1800000, // 30 minutos para nueva sesión
            useLocalFallback: true,
            debug: false
        };
        
        // Estado
        this.stats = {
            total: 0,
            unique: 0,
            today: 0,
            yesterday: 0,
            month: 0,
            daily_average: 0,
            peak_day: { date: '', count: 0 }
        };
        
        // Cache local
        this.localCache = {
            lastApiCall: 0,
            lastVisit: this.getLastVisitTime(),
            cachedStats: null
        };
        
        // Inicializar
        this.init();
    }
    
    /**
     * Inicializar contador
     */
    async init() {
        try {
            // 1. Registrar visita si es necesario
            if (this.shouldRegisterVisit()) {
                await this.registerVisit();
            }
            
            // 2. Cargar estadísticas
            await this.loadStats();
            
            // 3. Actualizar UI
            this.updateUI();
            
            // 4. Animar números
            setTimeout(() => this.animateCounters(), 500);
            
            // 5. Actualizar periódicamente
            this.startAutoUpdate();
            
            if (this.config.debug) {
                console.log('✅ Contador global inicializado', this.stats);
            }
            
        } catch (error) {
            console.error('❌ Error inicializando contador:', error);
            this.useFallback();
        }
    }
    
    /**
     * Verificar si debe registrar visita
     */
    shouldRegisterVisit() {
        // Si nunca ha visitado, sí registrar
        if (!this.localCache.lastVisit) return true;
        
        // Si pasó más del tiempo de sesión, registrar
        const now = Date.now();
        const elapsed = now - this.localCache.lastVisit;
        return elapsed > this.config.sessionTimeout;
    }
    
    /**
     * Registrar visita en el servidor
     */
    async registerVisit() {
        try {
            const response = await this.callApi();
            
            if (response && response.success) {
                // Actualizar tiempo de última visita
                this.setLastVisitTime();
                
                // Actualizar estadísticas
                this.updateStats(response.data);
                
                if (this.config.debug) {
                    console.log('✅ Visita registrada:', response);
                }
                
                return response;
            }
            
            throw new Error('API response not successful');
            
        } catch (error) {
            if (this.config.debug) {
                console.warn('⚠️ Falló registro en API, usando fallback:', error);
            }
            
            if (this.config.useLocalFallback) {
                this.useLocalFallback();
            }
            
            return null;
        }
    }
    
    /**
     * Cargar estadísticas (sin registrar visita)
     */
    async loadStats() {
        try {
            // Usar cache si es reciente
            const now = Date.now();
            if (this.localCache.cachedStats && 
                (now - this.localCache.lastApiCall) < 30000) {
                this.updateStats(this.localCache.cachedStats);
                return;
            }
            
            // Llamar API solo para obtener stats
            const response = await this.callApi('get');
            
            if (response && response.success) {
                this.updateStats(response.data);
                this.localCache.cachedStats = response.data;
                this.localCache.lastApiCall = now;
            }
            
        } catch (error) {
            console.warn('⚠️ Error cargando estadísticas:', error);
            this.useFallback();
        }
    }
    
    /**
     * Llamar a la API
     */
    async callApi(action = 'register') {
        const url = new URL(this.config.apiUrl, window.location.origin);
        url.searchParams.append('action', action);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    
    /**
     * Actualizar estadísticas internas
     */
    updateStats(apiData) {
        this.stats = {
            total: apiData.total || 0,
            unique: apiData.unique || 0,
            today: apiData.today || 0,
            yesterday: apiData.yesterday || 0,
            month: apiData.month || 0,
            daily_average: apiData.daily_average || 0,
            peak_day: apiData.peak_day || { date: '', count: 0 },
            start_date: apiData.start_date || '',
            last_updated: apiData.last_updated || ''
        };
    }
    
    /**
     * Actualizar interfaz de usuario
     */
    updateUI() {
        // Elementos principales
        this.updateElement('total-visits', this.stats.total);
        this.updateElement('today-visits', this.stats.today);
        this.updateElement('unique-visits', this.stats.unique);
        
        // Elementos adicionales (si existen)
        this.updateElement('yesterday-visits', this.stats.yesterday);
        this.updateElement('month-visits', this.stats.month);
        this.updateElement('average-visits', this.stats.daily_average);
        
        // Actualizar título con contador
        this.updatePageTitle();
        
        // Actualizar tooltips con info adicional
        this.updateTooltips();
    }
    
    /**
     * Actualizar elemento específico
     */
    updateElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            const formattedValue = this.formatNumber(value);
            if (element.textContent !== formattedValue) {
                element.textContent = formattedValue;
                element.classList.add('updated');
                setTimeout(() => element.classList.remove('updated'), 1000);
            }
        }
    }
    
    /**
     * Formatear número con separadores
     */
    formatNumber(num) {
        return new Intl.NumberFormat('es-MX').format(num);
    }
    
    /**
     * Animar contadores
     */
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const currentValue = parseInt(counter.textContent.replace(/,/g, '') || '0');
            const targetValue = parseInt(counter.getAttribute('data-target') || currentValue);
            
            if (currentValue !== targetValue) {
                this.animateValue(counter, currentValue, targetValue, 1500);
                counter.setAttribute('data-target', targetValue);
            }
        });
    }
    
    /**
     * Animación suave de números
     */
    animateValue(element, start, end, duration) {
        if (start === end) return;
        
        const range = end - start;
        const startTime = Date.now();
        
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        
        const update = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const value = Math.floor(start + (range * eased));
            
            element.textContent = this.formatNumber(value);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = this.formatNumber(end);
            }
        };
        
        requestAnimationFrame(update);
    }
    
    /**
     * Usar fallback local
     */
    useLocalFallback() {
        const localStats = this.getLocalStats();
        this.stats.total = localStats.total;
        this.stats.today = localStats.today;
        this.stats.unique = localStats.unique;
        
        // Guardar para siguiente vez
        this.saveLocalStats();
    }
    
    /**
     * Fallback completo (cuando todo falla)
     */
    useFallback() {
        // Intentar cargar de localStorage
        const saved = localStorage.getItem('irc_visit_fallback');
        if (saved) {
            this.stats = JSON.parse(saved);
        } else {
            // Valores por defecto (puedes personalizar)
            this.stats = {
                total: 1275,
                unique: 892,
                today: 45,
                yesterday: 38,
                month: 324,
                daily_average: 42
            };
        }
        
        this.updateUI();
    }
    
    /**
     * Obtener estadísticas locales
     */
    getLocalStats() {
        const today = new Date().toISOString().split('T')[0];
        const saved = localStorage.getItem('irc_local_visits');
        
        if (saved) {
            const data = JSON.parse(saved);
            
            // Resetear si es nuevo día
            if (data.date !== today) {
                data.yesterday = data.today;
                data.today = 0;
                data.date = today;
            }
            
            data.today++;
            data.total++;
            
            return data;
        }
        
        // Crear nuevo
        return {
            date: today,
            total: 1,
            today: 1,
            unique: 1,
            yesterday: 0
        };
    }
    
    /**
     * Guardar estadísticas locales
     */
    saveLocalStats() {
        const data = {
            date: new Date().toISOString().split('T')[0],
            total: this.stats.total,
            today: this.stats.today,
            unique: this.stats.unique,
            last_updated: new Date().toISOString()
        };
        
        localStorage.setItem('irc_local_visits', JSON.stringify(data));
        localStorage.setItem('irc_visit_fallback', JSON.stringify(this.stats));
    }
    
    /**
     * Obtener tiempo de última visita
     */
    getLastVisitTime() {
        return parseInt(localStorage.getItem('irc_last_visit') || '0');
    }
    
    /**
     * Establecer tiempo de última visita
     */
    setLastVisitTime() {
        localStorage.setItem('irc_last_visit', Date.now().toString());
        this.localCache.lastVisit = Date.now();
    }
    
    /**
     * Actualizar título de página
     */
    updatePageTitle() {
        // Opcional: Agregar contador al título
        // document.title = `(${this.formatNumber(this.stats.total)}) ${document.title}`;
    }
    
    /**
     * Actualizar tooltips
     */
    updateTooltips() {
        // Agregar tooltips informativos
        const elements = {
            'total-visits': `Total de visitas desde ${this.stats.start_date || 'el inicio'}`,
            'today-visits': `Visitas hoy • Ayer: ${this.formatNumber(this.stats.yesterday)}`,
            'unique-visits': `Visitantes únicos • Promedio diario: ${this.formatNumber(this.stats.daily_average)}`
        };
        
        Object.entries(elements).forEach(([id, title]) => {
            const element = document.getElementById(id);
            if (element && !element.title) {
                element.title = title;
            }
        });
    }
    
    /**
     * Iniciar actualización automática
     */
    startAutoUpdate() {
        setInterval(() => {
            this.loadStats().then(() => {
                this.updateUI();
            });
        }, this.config.updateInterval);
    }
    
    /**
     * Obtener estadísticas (para debugging o uso externo)
     */
    getStats() {
        return { ...this.stats };
    }
    
    /**
     * Exportar estadísticas
     */
    exportStats() {
        return JSON.stringify({
            stats: this.stats,
            cache: this.localCache,
            config: this.config
        }, null, 2);
    }
}

// ==============================================
// INICIALIZACIÓN GLOBAL
// ==============================================

// Variable global para acceso desde consola
window.VisitCounter = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia global
    window.VisitCounter = new GlobalVisitCounter();
    
    // Exponer métodos útiles para debugging
    if (window.location.search.includes('debug=visits')) {
        window.debugVisits = {
            getStats: () => window.VisitCounter?.getStats(),
            export: () => window.VisitCounter?.exportStats(),
            forceUpdate: () => window.VisitCounter?.loadStats(),
            resetLocal: () => {
                localStorage.removeItem('irc_last_visit');
                localStorage.removeItem('irc_local_visits');
                console.log('✅ Cache local reseteado');
            }
        };
        console.log('🔧 Debug de visitas activado. Usa window.debugVisits');
    }
    
    // Detectar cambios de visibilidad
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && window.VisitCounter) {
            // Recargar estadísticas cuando la página vuelve a ser visible
            setTimeout(() => window.VisitCounter.loadStats(), 1000);
        }
    });
});

// Manejar errores no capturados
window.addEventListener('error', (event) => {
    if (event.message.includes('VisitCounter')) {
        console.warn('Error en contador de visitas, usando fallback simple');
        // Fallback simple
        const elements = ['total-visits', 'today-visits', 'unique-visits'];
        elements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '1,000+';
        });
    }
});