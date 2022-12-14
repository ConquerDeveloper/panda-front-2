const emailTemplate = ({emailContent}) => '<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">\n' +
    '<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>\n' +
    '<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>\n' +
    '<!------ Include the above in your HEAD tag ---------->\n' +
    '\n' +
    '<style>\n' +
    '/***\n' +
    'User Profile Sidebar by @keenthemes\n' +
    'A component of Metronic Theme - #1 Selling Bootstrap 3 Admin Theme in Themeforest: http://j.mp/metronictheme\n' +
    'Licensed under MIT\n' +
    '***/\n' +
    '\n' +
    'body {\n' +
    '    padding: 0;\n' +
    '    margin: 0;\n' +
    '}\n' +
    '\n' +
    'html { -webkit-text-size-adjust:none; -ms-text-size-adjust: none;}\n' +
    '@media only screen and (max-device-width: 680px), only screen and (max-width: 680px) { \n' +
    '    *[class="table_width_100"] {\n' +
    '\t\twidth: 96% !important;\n' +
    '\t}\n' +
    '\t*[class="border-right_mob"] {\n' +
    '\t\tborder-right: 1px solid #dddddd;\n' +
    '\t}\n' +
    '\t*[class="mob_100"] {\n' +
    '\t\twidth: 100% !important;\n' +
    '\t}\n' +
    '\t*[class="mob_center"] {\n' +
    '\t\ttext-align: center !important;\n' +
    '\t}\n' +
    '\t*[class="mob_center_bl"] {\n' +
    '\t\tfloat: none !important;\n' +
    '\t\tdisplay: block !important;\n' +
    '\t\tmargin: 0px auto;\n' +
    '\t}\t\n' +
    '\t.iage_footer a {\n' +
    '\t\ttext-decoration: none;\n' +
    '\t\tcolor: #929ca8;\n' +
    '\t}\n' +
    '\timg.mob_display_none {\n' +
    '\t\twidth: 0px !important;\n' +
    '\t\theight: 0px !important;\n' +
    '\t\tdisplay: none !important;\n' +
    '\t}\n' +
    '\timg.mob_width_50 {\n' +
    '\t\twidth: 40% !important;\n' +
    '\t\theight: auto !important;\n' +
    '\t}\n' +
    '}\n' +
    '.table_width_100 {\n' +
    '\twidth: 680px;\n' +
    '}\n' +
    '</style>\n' +
    '\n' +
    '<!--\n' +
    'Responsive Email Template by @keenthemes\n' +
    'A component of Metronic Theme - #1 Selling Bootstrap 3 Admin Theme in Themeforest: http://j.mp/metronictheme\n' +
    'Licensed under MIT\n' +
    '-->\n' +
    '\n' +
    '<div id="mailsub" class="notification" align="center">\n' +
    '    <!--<div align="center">\n' +
    '       <img src="http://talmanagency.com/wp-content/uploads/2014/12/cropped-logo-new.png" width="250" alt="Metronic" border="0"  /> \n' +
    '    </div> -->\n' +
    '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width: 320px;"><tr><td align="center" bgcolor="#eff3f8">\n' +
    '\n' +
    '\n' +
    '<!--[if gte mso 10]>\n' +
    '<table width="680" border="0" cellspacing="0" cellpadding="0">\n' +
    '<tr><td>\n' +
    '<![endif]-->\n' +
    '\n' +
    '<table border="0" cellspacing="0" cellpadding="0" class="table_width_100" width="100%" style="max-width: 680px; min-width: 300px;">\n' +
    '    <tr><td>\n' +
    '\t<!-- padding -->\n' +
    '\t</td></tr>\n' +
    '\t<!--header -->\n' +
    '\t<tr><td align="center" bgcolor="#ffffff">\n' +
    '\t\t<!-- padding -->\n' +
    '\t\t<table width="90%" border="0" cellspacing="0" cellpadding="0">\n' +
    '\t\t\t<tr><td align="center">\n' +
    '\t\t\t    \t\t<a href="#" target="_blank" style="color: #596167; font-family: Arial, Helvetica, sans-serif; float:left; width:100%; padding:20px;text-align:center; font-size: 13px;">\n' +
    '\t\t\t\t\t\t\t\t\t<font face="Arial, Helvetica, sans-seri; font-size: 13px;" size="3" color="#596167">\n' +
    '\t\t\t\t\t\t\t\t\t<img src="https://scontent.fscl13-2.fna.fbcdn.net/v/t39.30808-6/305481475_598435568473536_2795711894771562887_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=eQ6kgAATm5EAX_boiBW&_nc_ht=scontent.fscl13-2.fna&oh=00_AfCNzQH71qU4bxZnepb4VL7qHDa9cuEBKnCAmCBQz5o1bQ&oe=639B27D3" width="250" alt="Metronic" border="0"  /></font></a>\n' +
    '\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t<td align="right">\n' +
    '\t\t\t\t<!--[endif]--><!-- \n' +
    '\n' +
    '\t\t\t</td>\n' +
    '\t\t\t</tr>\n' +
    '\t\t</table>\n' +
    '\t\t<!-- padding -->\n' +
    '\t</td></tr>\n' +
    '\t<!--header END-->\n' +
    '\n' +
    '\t<!--content 1 -->\n' +
    '\t<tr><td align="center" bgcolor="#fbfcfd">\n' +
    '\t    <font face="Arial, Helvetica, sans-serif" size="4" color="#57697e" style="font-size: 15px;">\n' +
    '\t\t<table width="90%" border="0" cellspacing="0" cellpadding="0">\n' +
    '\t\t\t<tr><td>\n' +
    '\t\t\t    <b>¡Gracias por su compra!</b><br/>\n' +
    '\t\t\t    Su pedido fue ingresado, nuestro equipo lo está revisando para confirmar el stock y disponibilidad de sus productos, en las próximas 24 horas nos estaremos comunicando para poder finalizar el proceso de pago. \n' +
    '\n' +
    'En caso de no tener respuesta en el transcurso indicado, puede comunicarse con nosotros a través del siguiente numero telefónico +56984021213 (vía WhatsApp) o al correo ventaspandastore@gmail.com<br/>\n' +
    '\t\t\t\t<!-- padding --><div style="height: 60px; line-height: 60px; font-size: 10px;"></div>\n' +
    '\t\t\t</td></tr>\n' +
    '\n' +
    '\t\t</table>\n' +
    '\t\t</font>\n' +
    '\t</td></tr>\n' +
    '\t<!--content 1 END-->\n' +
    '\n' +
    '\n' +
    '\t<!--footer -->\n' +
    '\t<tr><td class="iage_footer" align="center" bgcolor="#ffffff">\n' +
    '\n' +
    '\t\t\n' +
    '\t\t<table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
    '\t\t\t<tr><td align="center" style="padding:20px;flaot:left;width:100%; text-align:center;">\n' +
    '\t\t\t\t<font face="Arial, Helvetica, sans-serif" size="3" color="#96a5b5" style="font-size: 13px;">\n' +
    '\t\t\t\t<span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #96a5b5;">\n' +
    '\t\t\t\t\t2022 ©. Todos los derechos reservados.\n' +
    '\t\t\t\t</span></font>\t\t\t\t\n' +
    '\t\t\t</td></tr>\t\t\t\n' +
    '\t\t</table>\n' +
    '\t</td></tr>\n' +
    '\t<!--footer END-->\n' +
    '\t<tr><td>\n' +
    '\n' +
    '\t</td></tr>\n' +
    '</table>\n' +
    '<!--[if gte mso 10]>\n' +
    '</td></tr>\n' +
    '</table>\n' +
    '<![endif]-->\n' +
    ' \n' +
    '</td></tr>\n' +
    '</table>\n' +
    '\t\t\t';

export default emailTemplate;
