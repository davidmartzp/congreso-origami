<!DOCTYPE html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700" rel="stylesheet" type="text/css" />
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            font-family: Poppins, Arial, Helvetica, sans-serif;
        }

        .row-content {
            background-color: #ffffff;
            color: #000000;
            width: 100%;
            max-width: 680px;
            margin: 0 auto;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(115, 20, 37, 0.1);
        }

        .column {
            padding: 20px;
        }

        .heading_block h3 {
            color: #731425;
            font-size: 28px;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .text_block p {
            font-size: 16px;
            line-height: 1.6;
            text-align: center;
            margin: 20px 0;
        }

        .text_block a {
            color: #731425;
            text-decoration: none;
            font-weight: 600;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease;
        }

        .text_block a:hover {
            border-bottom: 2px solid #731425;
        }

        .resource-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
            box-shadow: 0 4px 15px rgba(115, 20, 37, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .resource-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(115, 20, 37, 0.15);
        }

        .resource-title {
            font-size: 18px;
            font-weight: 600;
            color: #731425;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .resource-emoji {
            font-size: 24px;
            margin-right: 10px;
        }

        .resource-link {
            display: inline-block;
            background: linear-gradient(135deg, #731425 0%, #8b1a2e 100%);
            color: #ffffff !important;
            padding: 12px 24px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(115, 20, 37, 0.3);
        }

        .resource-link:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 15px rgba(115, 20, 37, 0.4);
            border-bottom: none !important;
        }

        .location-highlight {
            background: linear-gradient(135deg, #731425 0%, #8b1a2e 100%);
            color: #ffffff;
            padding: 30px;
            margin: 30px 0;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(115, 20, 37, 0.25);
        }

        .location-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }

        .location-name {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .location-address {
            font-size: 16px;
            margin-bottom: 20px;
            opacity: 0.9;
        }

        .maps-button {
            display: inline-block;
            background-color: #ffffff;
            color: #731425 !important;
            padding: 15px 30px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .maps-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            border-bottom: none !important;
        }

        .additional-info {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
        }

        .info-item {
            margin: 15px 0;
            padding: 15px;
            background: #ffffff;
            border-radius: 10px;
            border-left: 4px solid #731425;
        }

        .footer {
            background: linear-gradient(135deg, #731425 0%, #8b1a2e 100%);
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
        }

        .footer p {
            font-size: 12px;
            margin: 0;
        }

        .social-icons {
            margin: 20px 0;
        }

        .social-icons img {
            margin: 0 8px;
            transition: transform 0.3s ease;
        }

        .social-icons img:hover {
            transform: scale(1.1);
        }

        @media (max-width:700px) {
            .row-content {
                width: 100% !important;
                margin: 10px;
                border-radius: 15px;
            }

            .column {
                width: 100%;
                display: block;
                padding: 15px;
            }

            .resource-card {
                margin: 10px 0;
                padding: 15px;
            }

            .location-highlight {
                padding: 20px;
                margin: 20px 0;
            }
        }

        @media (prefers-color-scheme: dark) {
            body {
                background: linear-gradient(135deg, #121212 0%, #1e1e1e 100%);
            }

            .row-content {
                background-color: #1e1e1e;
                color: #ffffff;
            }

            .resource-card {
                background: linear-gradient(135deg, #2a2a2a 0%, #353535 100%);
                border-color: #444444;
            }

            .heading_block h3 {
                color: #ff6f61;
            }

            .text_block a {
                color: #ff6f61;
            }

            .resource-title {
                color: #ff6f61;
            }

            .location-highlight {
                background: linear-gradient(135deg, #ff6f61 0%, #ff8a7a 100%);
            }

            .footer {
                background: linear-gradient(135deg, #ff6f61 0%, #ff8a7a 100%);
            }

            .additional-info {
                background: linear-gradient(135deg, #2a2a2a 0%, #353535 100%);
            }

            .info-item {
                background: #1e1e1e;
                border-left-color: #ff6f61;
            }

            .social-table img {
                filter: invert(1);
            }

            .icons_block img {
                filter: none !important;
            }
        }
    </style>
</head>

<body>
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" width="100%">
        <tbody>
            <tr>
                <td>
                    <table class="row-content" role="presentation">
                        <tbody>
                            <tr>
                                <td class="column">
                                    <!-- Banner -->
                                    <table class="image_block" role="presentation" width="100%">
                                        <tr>
                                            <td style="text-align: center;">
                                                <img alt="Banner" class="fullMobileWidth" src="https://origamibogota.com/images/libelula-email.png" style="display: block; height: auto; border: 0; width: 100%; max-width: 646px; border-radius: 15px 15px 0 0;" title="Banner" />
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Logo -->
                                    <table class="icons_block" role="presentation" width="100%">
                                        <tr>
                                            <td style="text-align: center; padding: 20px 0;">
                                                <img align="center" alt="Logo" class="icon" width="64" src="https://origamibogota.com/images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png" style="display: block; height: auto; margin: 0 auto; border: 0;" />
                                                <small style="display: block; margin-top: 8px; font-weight: 600; color: #731425;">Amigos Plegadores</small>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Heading -->
                                    <table class="heading_block" role="presentation" width="100%">
                                        <tr>
                                            <td>
                                                <h3>📋 Información y recursos importantes<br><span style="font-size: 24px; color: #8b1a2e;">Origami Bogotá 2025</span></h3>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Content -->
                                    <table class="text_block" role="presentation" width="100%">
                                        <tr>
                                            <td>
                                                <p style="font-size: 18px; font-weight: 600; color: #731425;">¡Hola, {{ $name }}! ☀️</p>
                                                <p>¡Ya estamos muy cerca de <strong>Origami Bogotá 2025</strong>! Te compartimos un resumen con toda la información clave que necesitas para disfrutar al máximo de esta experiencia:</p>
                                                
                                                <!-- Resource Cards -->
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>📋 Instrucciones del evento:</strong><br>
                                                        <a href="https://docs.google.com/document/d/1QUvn97FZU8NHgg4Rtj-nqs-ur0wTqFK2gFL5nJnh3qY/edit?tab=t.0" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Ver instrucciones completas</a>
                                                    </p>
                                                </div>
                                                
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>🍽️ Servicio de almuerzo:</strong><br>
                                                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdtGjYdQjBj44Fl-FBmIfdgd5fbFC9_HODxRC47-Q8GoJ5jcw/viewform" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Información del servicio de comida</a>
                                                    </p>
                                                </div>
                                                
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>🏙️ Actividades turísticas:</strong><br>
                                                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfx3Rq1C_tcggH6m6lLLmJlcgsOTHY9mBbxaNiULF0bh57EhQ/viewform" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Descubre actividades en Bogotá</a>
                                                    </p>
                                                </div>
                                                
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>📅 Cronograma del evento:</strong><br>
                                                        <a href="https://origamibogota.com/descargas/cronograma.pdf" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Horarios y programación</a>
                                                    </p>
                                                </div>
                                                
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>🧾 Menú de talleres:</strong><br>
                                                        <a href="https://origamibogota.com/booklet" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Ver todos los talleres disponibles</a>
                                                    </p>
                                                </div>
                                                
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>🚘 Información de parqueadero:</strong><br>
                                                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScfPv43xMaI2wvyb0N8FqtDMh2egd9Xp6DdSh7gR0nY5W9NJg/viewform" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Detalles sobre estacionamiento</a>
                                                    </p>
                                                </div>
                                                
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>❓ Preguntas frecuentes:</strong><br>
                                                        <a href="https://origamibogota.com/recursos" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Resuelve todas tus dudas</a>
                                                    </p>
                                                </div>
                                                
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>💬 Grupo de WhatsApp del evento:</strong><br>
                                                        <a href="https://chat.whatsapp.com/DcH13ICGGOQ87dhQoDyC2s" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Únete al grupo de participantes</a>
                                                    </p>
                                                </div>
                                                
                                                <div style="text-align: center; margin: 20px 0;">
                                                    <p><strong>📆 Agregar al calendario:</strong><br>
                                                        <a href="https://calendar.app.google/gjo1rrSf7k6m8r5Q6" target="_blank" style="color: #731425; text-decoration: underline; font-weight: bold;"><span style="color: #731425;">→</span> Añadir evento a tu calendario</a>
                                                    </p>
                                                </div>
                                                
                                                <!-- Location Highlight -->
                                                <div class="location-highlight">
                                                    <div class="location-title">📍 UBICACIÓN DEL EVENTO</div>
                                                    <div class="location-name">Liceo Francés Louis Pasteur</div>
                                                    <div class="location-address">Cl. 87 #7-77, Barrio La Cabrera, Bogotá</div>
                                                    <a href="https://maps.google.com/?q=Liceo+Francés+Louis+Pasteur+Cl.+87+%237-77+Bogotá" target="_blank" class="maps-button">🗺️ Ver en Google Maps</a>
                                                </div>
                                                
                                                <!-- Additional Information -->
                                                <div class="additional-info">
                                                    <h4 style="color: #731425; text-align: center; margin-bottom: 20px;">ℹ️ Información adicional</h4>
                                                    
                                                    <div class="info-item">
                                                        <strong>☕ Café de origen:</strong> Héctor Giraldo traerá café de origen. Si desean adquirir, pueden escribirle directamente.
                                                    </div>
                                                    
                                                    <div class="info-item">
                                                        <strong>👶 Niños menores de 12 años:</strong> Serán inscritos automáticamente en todos los talleres para niños (revisar en preguntas frecuentes).
                                                    </div>
                                                </div>
                                                
                                                <p style="margin-top: 30px;">Cualquier otra duda que no esté resuelta en la sección de preguntas frecuentes, nos pueden escribir a WhatsApp <a href="https://api.whatsapp.com/send?phone=573152459839" target="_blank">aquí</a> 📱</p>
                                                
                                                <p style="font-size: 18px; font-weight: 600; color: #731425; margin-top: 30px;">¡Los esperamos con mucho entusiasmo! 🎊<br>
                                                <span style="font-size: 16px; color: #8b1a2e;">Origami Bogotá 2025</span></p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Social Icons -->
                                    <table class="social_block" role="presentation" width="100%">
                                        <tr>
                                            <td style="text-align: center;" class="social-icons">
                                                <table class="social-table" role="presentation" style="display: inline-block;">
                                                    <tr>
                                                        <td style="padding: 0 8px;">
                                                            <a href="https://www.facebook.com/origamibogota" target="_blank">
                                                                <img alt="Facebook" height="40" src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" title="Facebook" width="40" />
                                                            </a>
                                                        </td>
                                                        <td style="padding: 0 8px;">
                                                            <a href="https://www.instagram.com/congresoorigamibogota" target="_blank">
                                                                <img alt="Instagram" height="40" src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" title="Instagram" width="40" />
                                                            </a>
                                                        </td>
                                                        <td style="padding: 0 8px;">
                                                            <a href="https://api.whatsapp.com/send?phone=573152459839" target="_blank">
                                                                <img alt="WhatsApp" height="40" src="https://cdn.tools.unlayer.com/social/icons/circle-black/whatsapp.png" title="WhatsApp" width="40" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Unsubscribe -->
                                    <p style="text-align: center; font-size: 12px; color: #999999; margin: 20px 0;">Si no desea recibir más correos electrónicos, puede <a href="https://origamibogota.com/unsubscribe" target="_blank" style="color: #731425;">darse de baja aquí</a>.</p>
                                    
                                    <!-- Footer -->
                                    <table class="footer" role="presentation" width="100%">
                                        <tr>
                                            <td>
                                                <p style="font-weight: 600;">©2025 Origami Bogotá. Todos los derechos reservados.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
