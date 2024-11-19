$(document).ready(function() {
    const mostrarAlerta = (icono, titulo, texto) => {
        Swal.fire({ icon: icono, title: titulo, text: texto });
    };

    const convertirJStoJQuery = (codigoJS) => {
        const reemplazos = [
            { regex: /addEventListener\(['"](.+?)['"],/g, replacement: '.on("$1",' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)/g, replacement: '$("#$1")' },
            { regex: /document\.querySelector\(['"](.+?)['"]\)/g, replacement: '$("$1")' },
            { regex: /document\.getElementsByClassName\(['"](.+?)['"]\)/g, replacement: '$(".${1}")' },
            { regex: /document\.querySelector\(['"](.+?)['"]\)\.innerHTML\s*=\s*(['"].*?['"])/g, replacement: '$("$1").html($2)' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.style\.display\s*=\s*['"]none['"]/g, replacement: '$("#$1").hide()' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.style\.display\s*=\s*['"]block['"]/g, replacement: '$("#$1").show()' },
            { regex: /document\.querySelectorAll\(['"](.+?)['"]\)/g, replacement: '$("$1")' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.classList\.add\(['"](.+?)['"]\)/g, replacement: '$("#$1").addClass("$2")' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.classList\.remove\(['"](.+?)['"]\)/g, replacement: '$("#$1").removeClass("$2")' },
            { regex: /document\.getElementById\(['"](.+?)['"]\)\.setAttribute\(['"](.+?)['"],\s*['"](.*?)['"]\)/g, replacement: '$("#$1").attr("$2", "$3")' }
        ];

        reemplazos.forEach(rep => {
            codigoJS = codigoJS.replace(rep.regex, rep.replacement);
        });

        return codigoJS;
    };

    $('#convert-btn').click(function() {
        const codigoJS = $('#js-code').val();

        
        if (codigoJS.trim() === '') {
            mostrarAlerta('warning', 'Campo vacío', 'Por favor, ingresa código JavaScript antes de convertir.');
            return;
        }

        try {
            new Function(codigoJS);  // Validar sintaxis del código JavaScript

            const codigoJQuery = convertirJStoJQuery(codigoJS);
            $('#jquery-output').val(codigoJQuery);

            mostrarAlerta('success', 'Conversión exitosa', 'El código se ha convertido correctamente a jQuery.');
        } catch (error) {
            mostrarAlerta('error', 'Error de sintaxis', `Error en el código JavaScript: ${error.message}`);
        }
    });

    $('#clear-btn').click(function() {
        $('#js-code').val('');
        $('#jquery-output').val('');
        mostrarAlerta('info', 'Campos limpiados', 'Los campos se han limpiado correctamente.');
    });

    $('#copy-btn').click(function() {
        const textoCopiado = $('#jquery-output')[0];
        textoCopiado.select();
        document.execCommand("copy");
        mostrarAlerta('success', 'Copiado', 'Código copiado al portapapeles!');
    });
});
