try {
    # Ruta del directorio
    $directorio = "C:\dgth_mep_scraping"

    # Cambiar al directorio especificado
    Set-Location $directorio

    # Ejecutar el comando node index.js
    node index.js
} catch {
    Write-Host "Se produjo un error: $_.Exception.Message"
}

# Pausar la ejecución para que la ventana de PowerShell no se cierre automáticamente
Pause
