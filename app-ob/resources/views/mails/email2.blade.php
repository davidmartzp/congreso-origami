<!DOCTYPE html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" type="text/css" />
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
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
        }

        .column {
            padding: 20px;
        }

        .heading_block h3 {
            color: #731425;
            font-size: 28px;
            font-weight: 400;
            text-align: center;
            margin-top: 20px;
        }

        .text_block p {
            font-size: 16px;
            line-height: 1.5;
            text-align: center;
            margin: 20px 0;
        }

        .text_block a {
            color: #731425;
            text-decoration: underline;
        }

        .footer {
            background-color: #731425;
            color: #ffffff;
            text-align: center;
            padding: 15px 0;
        }

        .footer p {
            font-size: 12px;
            margin: 0;
        }

        @media (max-width:700px) {
            .row-content {
                width: 100% !important;
            }

            .column {
                width: 100%;
                display: block;
            }
        }

        @media (prefers-color-scheme: dark) {
            body {
                background-color: #121212;
                color: #ffffff;
            }

            .row-content {
                background-color: #1e1e1e;
                color: #ffffff;
            }

            .heading_block h3 {
                color: #ff6f61;
            }

            .text_block a {
                color: #ff6f61;
            }

            .divider_inner {
                border-top: 3px solid #ff6f61;
            }

            .social-table img {
                filter: invert(1);
            }

            /* Prevent logo from being inverted in dark mode */
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
                                    <table class="heading_block" role="presentation" width="100%">
                                        <tr>
                                            <td>
                                                <h3>Se ha realizado un nuevo registro en Origami Bogotá 2025</h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <table class="text_block" role="presentation" width="100%">
                                        <tr>
                                            <td>
                                                <p>Estos son los datos del registro:</p>
                                                <table border="1" width="100%" style="margin: 20px auto; text-align: left;">
                                                    <tr>
                                                        <td>Fecha de pago</td>
                                                        <td>{{$obj->date}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nombre</td>
                                                        <td>{{$obj->name}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>País</td>
                                                        <td>{{$obj->country}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Teléfono</td>
                                                        <td>{{$obj->phone}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Correo Electrónico</td>
                                                        <td>{{$obj->email}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Medio de pago</td>
                                                        <td>{{$obj->pm}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Comprobante de pago</td>
                                                        <td>{{$obj->receipt}}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table class="image_block" role="presentation" width="100%">
                                        <tr>
                                            <td style="text-align: center;">
                                                <img alt="Banner" class="fullMobileWidth" src="https://origamibogota.com/images/libelula-email.png" style="display: block; height: auto; border: 0; width: 100%; max-width: 646px;" title="Banner" />
                                            </td>
                                        </tr>
                                    </table>
                                    <table class="icons_block" role="presentation" width="100%">
                                        <tr>
                                            <td style="text-align: center;">
                                                <img align="center" alt="Logo" class="icon" width="64" src="https://origamibogota.com/images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png" style="display: block; height: auto; margin: 0 auto; border: 0;" />
                                                <small style="display: block; margin-top: 5px;">Amigos Plegadores</small>
                                            </td>
                                        </tr>
                                    </table>
                                    <table class="social_block" role="presentation" width="100%">
                                        <tr>
                                            <td style="text-align: center;">
                                                <table class="social-table" role="presentation" style="display: inline-block;">
                                                    <tr>
                                                        <td style="padding: 0 5px;">
                                                            <a href="https://www.facebook.com/origamibogota" target="_blank">
                                                                <img alt="Facebook" height="32" src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" title="Facebook" width="32" />
                                                            </a>
                                                        </td>
                                                        <td style="padding: 0 5px;">
                                                            <a href="https://www.instagram.com/congresoorigamibogota" target="_blank">
                                                                <img alt="Instagram" height="32" src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" title="Instagram" width="32" />
                                                            </a>
                                                        </td>
                                                        <td style="padding: 0 5px;">
                                                            <a href="https://api.whatsapp.com/send?phone=573152459839" target="_blank">
                                                                <img alt="WhatsApp" height="32" src="https://cdn.tools.unlayer.com/social/icons/circle-black/whatsapp.png" title="WhatsApp" width="32" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table class="footer" role="presentation" width="100%">
                                        <tr>
                                            <td>
                                                <p>© 2025 Origami Bogotá. Todos los derechos reservados.</p>
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
