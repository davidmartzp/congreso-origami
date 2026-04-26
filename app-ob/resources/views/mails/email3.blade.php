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

        .registration-highlight {
            background: linear-gradient(135deg, #731425 0%, #8b1a2e 100%);
            color: #ffffff;
            padding: 30px;
            margin: 30px 0;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(115, 20, 37, 0.25);
        }

        .registration-code {
            font-size: 48px;
            font-weight: 700;
            margin: 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            letter-spacing: 2px;
        }

        .registration-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .action-button {
            display: inline-block;
            background-color: #ffffff;
            color: #731425 !important;
            padding: 15px 30px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            margin: 10px;
        }

        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            border-bottom: none !important;
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

        .excitement-banner {
            background: linear-gradient(45deg, #ff6f61, #ff8a7a, #731425);
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 15px;
            margin: 20px 0;
            box-shadow: 0 5px 20px rgba(115, 20, 37, 0.3);
        }

        .date-highlight {
            background: linear-gradient(135deg, #ff6f61 0%, #ff8a7a 100%);
            color: #ffffff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 15px;
            text-align: center;
            border: 2px solid #731425;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
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

            .registration-code {
                font-size: 36px;
            }

            .registration-highlight {
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

            .registration-highlight {
                background: linear-gradient(135deg, #ff6f61 0%, #ff8a7a 100%);
            }

            .footer {
                background: linear-gradient(135deg, #ff6f61 0%, #ff8a7a 100%);
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
                                    
                                    <!-- Excitement Banner -->
                                    <div class="excitement-banner">
                                        <h2 style="margin: 0; font-size: 22px; font-weight: 700;">🎉 ¡ESTAMOS MUY EMOCIONADOS! 🎉</h2>
                                        <p style="margin: 10px 0 0 0; font-size: 16px;">¡Ya casi es hora de Origami Bogotá 2025!</p>
                                    </div>
                                    
                                    <!-- Heading -->
                                    <table class="heading_block" role="presentation" width="100%">
                                        <tr>
                                            <td>
                                                <h3>🎫 Tu número de registro</h3>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Registration Number Highlight -->
                                    <div class="registration-highlight">
                                        <div class="registration-title">¡Saludos {{$obj->name}}! ✨</div>
                                        <p style="margin: 15px 0; font-size: 18px;">Tu número de registro para la inscripción en los talleres es:</p>
                                        <div class="registration-code">{{$obj->code}}</div>
                                        <p style="margin: 20px 0; font-size: 16px; opacity: 0.9;">¡Guárdalo bien, lo necesitarás para inscribir tus talleres!</p>
                                    </div>
                                    
                                    <!-- Date Highlight -->
                                    <div class="date-highlight">
                                        <h3 style="margin: 0; font-size: 20px; font-weight: 700;">📅 Fecha de inscripción de talleres</h3>
                                        <p style="margin: 10px 0; font-size: 18px; font-weight: 600;">Sábado 22 y Domingo 23 de febrero</p>
                                        <p style="margin: 10px 0; font-size: 16px;">La inscripción se realizará <strong>durante el evento</strong> desde las <strong>8:00 am</strong></p>
                                    </div>
                                    
                                    <!-- Content -->
                                    <table class="text_block" role="presentation" width="100%">
                                        <tr>
                                            <td>
                                                <p style="font-size: 18px; font-weight: 600; color: #731425;">📋 Prepárate para el evento</p>
                                                <p>Revisa la programación y planifica qué talleres te gustaría tomar durante el fin de semana.</p>
                                                
                                                <!-- Resource Cards -->
                                                <div class="resource-card">
                                                    <div class="resource-title">📋 Programación de talleres (PDF)</div>
                                                    <p style="margin: 10px 0;">Descarga la programación completa en formato PDF</p>
                                                    <div style="text-align: center;">
                                                        <a href="https://origamibogota.com/descargas/Programacion-de-talleres-origami-bogota-2025.pdf" target="_blank" class="action-button">📄 Descargar PDF</a>
                                                    </div>
                                                </div>

                                                <div class="resource-card">
                                                    <div class="resource-title">📱 Booklet digital</div>
                                                    <p style="margin: 10px 0;">Explora la programación en formato digital</p>
                                                    <div style="text-align: center;">
                                                        <a href="https://origamibogota.com/booklet" target="_blank" class="action-button">💻 Ver booklet digital</a>
                                                    </div>
                                                </div>


                                                
                                                <div class="resource-card">
                                                    <div class="resource-title">📆 Agregar al calendario</div>
                                                    <p style="margin: 10px 0;">No olvides la fecha del evento</p>
                                                    <div style="text-align: center;">
                                                        <a href="https://calendar.app.google/gjo1rrSf7k6m8r5Q6" target="_blank" class="action-button">📅 Añadir a mi calendario</a>
                                                    </div>
                                                </div>
                                                
                                                <div class="resource-card">
                                                    <div class="resource-title">💬 Únete al grupo de WhatsApp</div>
                                                    <p style="margin: 10px 0;">Mantente conectado con otros participantes</p>
                                                    <div style="text-align: center;">
                                                        <a href="https://chat.whatsapp.com/DcH13ICGGOQ87dhQoDyC2s" target="_blank" class="action-button">💬 Unirse al grupo</a>
                                                    </div>
                                                </div>
                                                
                                                <!-- Future Workshop Registration Info -->
                                                <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 15px; border: 2px solid #731425;">
                                                    <p style="font-size: 16px; color: #731425; margin-bottom: 15px;"><strong>⏰ Durante el evento podrás inscribir tus talleres en:</strong></p>
                                                    <a href="https://origamibogota.com/inscribir-talleres" target="_blank" class="action-button" style="background: linear-gradient(135deg, #731425 0%, #8b1a2e 100%); color: #ffffff !important;">
                                                        🎯 Portal de inscripción de talleres
                                                    </a>
                                                    <p style="font-size: 14px; color: #666; margin-top: 10px;"><em>Disponible durante el evento: Sáb 21 y Dom 22 de junio</em></p>
                                                </div>
                                                
                                                <p style="font-size: 18px; font-weight: 600; color: #731425; margin-top: 30px; text-align: center;">¡Nos vemos muy pronto! 🤗<br>
                                                <span style="font-size: 16px; color: #8b1a2e;">El equipo de Origami Bogotá 2025</span></p>
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
