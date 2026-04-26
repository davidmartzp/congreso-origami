export type Language = 'es' | 'en' | 'pt' | 'fr';

export interface ActivityItem {
  title: string;
  imageUrl: string;
  icon: string;
  content: string;
}

export interface FaqTranslationItem {
  id: string;
  icon: string;
  question: string;
  answer: string;
  column: number;
}

export interface ResourceItem {
  name: string;
  url: string;
}

export interface GuestTranslationItem {
  type: string;
  biography: string;
}

export interface ItineraryDay {
  title: string;
  content: string;
}

export interface SiteTranslations {
  menu: {
    home: string;
    about: string;
    inscriptions: string;
    guests: string;
    activities: string;
    workshops: string;
    friends: string;
    publishDiagrams: string;
    schedule: string;
    registerWorkshops: string;
    resources: string;
    contact: string;
    location: string;
    ob2025: string;
  };
  banner: {
    anniversary: string;
    venue: string;
    date: string;
  };
  banner2: {
    title: string;
    description: string;
    cta: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
  };
  guests: {
    title: string;
    description: string;
    international: string;
    national: string;
    items: GuestTranslationItem[];
  };
  itinerary: {
    title: string;
    subtitle: string;
    viewBtn: string;
    modalTitle: string;
    closeBtn: string;
    attribution: string;
    days: ItineraryDay[];
  };
  activities: {
    title: string;
    subtitle: string;
    viewDetails: string;
    prev: string;
    next: string;
    items: ActivityItem[];
  };
  footer: {
    contact: string;
    location: string;
    register: string;
    registerText: string;
    registerBtn: string;
    quickLinks: string;
    rights: string;
    home: string;
    inscriptions: string;
    workshops: string;
  };
  faq: {
    title: string;
    subtitle: string;
    contactText: string;
    contactLink: string;
    items: FaqTranslationItem[];
  };
  banner3: {
    title: string;
    description: string;
    cta: string;
  };
  resources: {
    title: string;
    subtitle: string;
    downloadBtn: string;
    items: ResourceItem[];
  };
  sponsors: {
    title: string;
  };
  workshopsInscriptions: {
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    registerBtn: string;
    bookletBtn: string;
    menuBtn: string;
    countdownTitle: string;
    countdownSubtitle: string;
    availableIn: string;
    days: string;
    hours: string;
    minutes: string;
  };
  inscriptions: {
    heroTitle: string;
    howTitle: string;
    howDescription: string;
    step1Title: string;
    step1Description: string;
    step1Btn: string;
    step2Title: string;
    step2Description: string;
    step2Btn: string;
    pageTitle: string;
    pageSubtitle: string;
    buyBtn: string;
    dailyTitle: string;
    selectBtn: string;
    earlyBirdName: string;
    earlyBirdBadge: string;
    earlyBirdDeadline: string;
    phase2Deadline: string;
    includes: string[];
    saturdayDay: string;
    sundayDay: string;
    saturdayDesc: string;
    sundayDesc: string;
    paymentInfoTitle: string;
    paymentInfoHtml: string;
    continueBtn: string;
    cancelBtn: string;
    payMethodsTitle: string;
    payMethodsDesc: string;
    payMethodsFooter: string;
    mobileDesc: string;
    bankTitle: string;
    bankDesc: string;
    cardTitle: string;
    cardDesc: string;
    cardLink: string;
    cashTitle: string;
    cashDesc: string;
    step2Header: string;
    step2Subtitle: string;
    stepPersonal: string;
    stepContact: string;
    stepPayment: string;
    stepParticip: string;
    stepOptions: string;
    stepOf: string;
    prevBtn: string;
    nextBtn: string;
    submitBtn: string;
    sendingBtn: string;
    successTitle: string;
    successMsg: string;
    successMsg2: string;
    checkEmail: string;
    newRegistration: string;
    personalTitle: string;
    nameLabel: string;
    lastnameLabel: string;
    ageLabel: string;
    idnameLabel: string;
    contactTitle: string;
    countryLabel: string;
    cityLabel: string;
    emailLabel: string;
    emailHint: string;
    phoneLabel: string;
    paymentTitle: string;
    payTypeLabel: string;
    selectOption: string;
    cashNote: string;
    payDateLabel: string;
    receiptLabel: string;
    receiptHint: string;
    participTitle: string;
    participQuestion: string;
    allDays: string;
    satOnly: string;
    sunOnly: string;
    companionLabel: string;
    companionHint: string;
    optionsTitle: string;
    howHeardLabel: string;
    socialMedia: string;
    press: string;
    tv: string;
    referrals: string;
    other: string;
    specifyPlaceholder: string;
    printCertLabel: string;
    origamiGroupLabel: string;
    origamiGroupPlaceholder: string;
    cardsLabel: string;
    cardsHint: string;
    cardsPlaceholder: string;
    workshopsLabel: string;
    workshopsHint: string;
    chivaLabel: string;
    chivaAdultsOnly: string;
    chivaCompanionsQuestion: string;
    chivaNo: string;
    chivaYes: string;
    companionsNumLabel: string;
    companionsNumHint: string;
    companionsNumPlaceholder: string;
    note1: string;
    note2: string;
    note3: string;
    note4: string;
    valName: string;
    valLastname: string;
    valAge: string;
    valIdname: string;
    valCountry: string;
    valCity: string;
    valEmail: string;
    valEmailInvalid: string;
    valPhone: string;
    valPhoneNumeric: string;
    valPayMethod: string;
    valPayDate: string;
    valReceipt: string;
    valDays: string;
    valHowHeard: string;
    valHowHeardSpecify: string;
    valOrigamiGroup: string;
    valCardGroup: string;
    valCardGroupRange: string;
    valChivaAccompanied: string;
    valChivaCompanions: string;
    valChivaMin: string;
    valChivaMax: string;
    chivaErrNum: string;
    chivaErrMin: string;
    chivaErrMax: string;
    alertTitle: string;
    submitError: string;
    submitErrorTitle: string;
  };
  seo: {
    home: { title: string; description: string };
    inscripciones: { title: string; description: string };
    talleres: { title: string; description: string };
    recursos: { title: string; description: string };
    amigosPlegadores: { title: string; description: string };
    booklet: { title: string; description: string };
  };
}

export const TRANSLATIONS: Record<Language, SiteTranslations> = {
  es: {
    menu: {
      home: 'Inicio',
      about: 'Acerca del evento',
      inscriptions: 'Inscripciones abiertas',
      guests: 'Invitados',
      activities: 'Actividades',
      workshops: 'Talleres',
      friends: 'Amigos Plegadores',
      publishDiagrams: 'Publica tus diagramas',
      schedule: 'Programación de talleres 2026',
      registerWorkshops: 'Inscribir Talleres',
      resources: 'Preguntas y recursos',
      contact: 'Contáctanos',
      location: 'Ubicación del evento',
      ob2025: 'Origami Bogotá 2025',
    },
    banner: {
      anniversary: '15 AÑOS CELEBRANDO EL ARTE DEL ORIGAMI',
      venue: 'Liceo Francés Louis Pasteur',
      date: '12 a 14 de Junio de 2026',
    },
    banner2: {
      title: 'Bienvenidos',
      description: '¡Inscripciones abiertas para nuestro próximo evento! No pierdas la oportunidad de aprender con nosotros.',
      cta: 'Inscripciones Abiertas',
    },
    about: {
      title: 'Acerca del evento',
      p1: 'Origami Bogotá es un evento pensado para todos los apasionados grandes y chicos por doblar papel. Es un espacio para conocer personas con los mismos intereses y pasión por plegar figuras en origami. Origami Bogotá da la posibilidad de aprender nuevas técnicas de plegado e introducirse en el mundo del origami si es la primera vez que asisten.',
      p2: 'Durante el evento se pliega en diferentes espacios, no sólo los talleres sino mientras se toma un café o se está en un pasillo. Durante los años hemos trabajado para que todos los amantes de este arte tengan un lugar en el evento, por lo cual tenemos espacios para adultos con diferentes niveles de complejidad (desde principiantes hasta avanzados) y otro espacio para niños. Es muy emocionante ver cómo personas más experimentadas forman modelos complejos y los exponen mostrando las posibilidades infinitas y la versatilidad del papel.',
    },
    guests: {
      title: 'Invitados',
      description: 'Cada año hay un invitado internacional y uno nacional, por lo que para muchos ésta es una oportunidad única de conocer de primera mano a origamistas muy reconocidos...',
      international: 'Invitado Internacional',
      national: 'Invitado Nacional',
      items: [
        {
          type: 'Invitado Internacional',
          biography: 'Joseph Wu es un artista de Vancouver que descubrió el origami a los tres años y crea diseños originales desde los once. Es un referente internacional: ha dictado clases y conferencias, expuesto su obra en museos y participado activamente en la comunidad global del origami.\n\nSu trabajo ha sido reseñado en medios como The New York Times y ha colaborado con marcas y producciones audiovisuales. Entre sus obras más destacadas se encuentran la escultura lumínica del restaurante Botanist y la instalación "Jelly Swarm" en el Acuario de Vancouver.',
        },
        {
          type: 'Invitada Nacional',
          biography: 'Diana Milena Vargas Rodríguez es una origamista colombiana dedicada al diseño de modelos de origami, especialmente en el campo del origami modular y geométrico. Su trabajo se caracteriza por la creación de estructuras tridimensionales elaboradas a partir de múltiples módulos de papel, en las que explora patrones, simetrías y composiciones visuales complejas.\n\nA lo largo de su trayectoria ha diseñado diversos modelos originales, entre ellos estrellas, cubos y kusudamas, que han sido compartidos en convenciones y repositorios internacionales de origami. Sus creaciones reflejan un interés particular por la estética geométrica y por el potencial del plegado de papel como forma de creatividad, precisión y expresión artística.\n\nAdemás de su labor como diseñadora, ha participado en espacios de divulgación y enseñanza del origami, contribuyendo a promover esta práctica como herramienta de aprendizaje, arte y exploración matemática.',
        },
      ],
    },
    itinerary: {
      title: '¡El Itinerario!',
      subtitle: "Todo lo que necesitas saber pa' sobrevivir al finde más plegado del año",
      viewBtn: 'Ver itinerario completo',
      modalTitle: 'El itinerario',
      closeBtn: 'Cerrar',
      attribution: 'El itinerario: Camilo Torres.',
      days: [
        {
          title: 'Día —',
          content: `Ya sabemos que está tachando los días que faltan para el evento uno a uno en su calendario,
                    pliegue sistemáticamente los modelos del libro digital, escriba sobre su ansiedad en el grupo de WhatsApp
                    y tenga paciencia, solo podemos hacer un evento al año.`
        },
        {
          title: 'Unos meses antes',
          content: `Ya están abiertas las inscripciones, ¡de por diós!, inscríbase ya, que le sale más barato
                    y tiene mejor turno para escoger talleres.`
        },
        {
          title: '60 días antes',
          content: `Aún estamos en el grupo de WhatsApp del año pasado, algún adelantado empezará a preguntar por los pines,
                    no entre en pánico pero tampoco se relaje que no es mañana pero tampoco hay tanto tiempo, es momento de
                    empezar a pensar en los pines, las tarjetas y su expo personal, bueno está bien entre en pánico supérelo y empiece a doblar.`
        },
        {
          title: '1 día antes',
          content: `Aún puede trasnochar y aprovechar la ansiedad si no empezó antes puede llegar al menos con 10 pines,
                    me pido uno, nada como pin con ansiedad y adrenalina, aliste la maleta y prepárese para el fin de semana que tanto ha esperado.`
        },
        {
          title: 'Día 1',
          content: `<ol>
                      <li>Espere la noche antes de que arranque el evento (es importante dormir aunque la ansiedad no lo deje).</li>
                      <li>En la fecha indicada desplácese hasta el sitio, si lo prefiere un par de horas antes de que todo comience,
                          seguro encontrará a otro Origamista ansioso por el sector, podrán almorzar juntos (en caso extremo desayunar)
                          tomarse un café y esperar a que sean las 3 (ya aprendimos y en 1/2 hora no se monta la expo).</li>
                      <li>Reclame su kit y si dobló algo para la Expo diríjase a hacer el montaje; Alejo Erazo lo estará esperando,
                          no se desespere y tenga paciencia. Espere con calma mientras revisa el contenido del kit
                          (haga lista mental de con qué va a completar la caja para el día siguiente).</li>
                      <li>Listo para el canelazo y la inauguración, seguro que para estas alturas ya habrá doblado algo en los pasillos
                          y habrá adelantado cuaderno con los viejos amigos o habrá conocido a su parche del fin de semana.</li>
                      <li>Prepárese para no dormir esta noche tampoco.</li>
                      <li>Duerma por favor! … Esperé día 2</li>
                    </ol>`
        },
        {
          title: 'Día 2',
          content: `<ol start="0">
                      <li>Como no pudo dormirse temprano y finalmente pudo conciliar el sueño como a las 4 am, apúrele porque va a llegar tarde.</li>
                      <li>Mientras se desplaza al evento en transmi, taxi, Uber, bici, teletransportación o corriendo entre a la página y
                          seleccione los talleres, no entre en pánico, si no lo deja entrar tal vez aún no es su turno.
                          ¡Si ud es el que conduce pare para inscribir, no use su celular mientras conduce.</li>
                      <li>Dedíquese a plegar todo el día, prepárese mentalmente para la foto grupal, si es precavido ya sabrá dónde va a almorzar,
                          si no, fresco: hay grupos que ya tienen estudiada la zona, péguese al que más le llame la atención.</li>
                      <li>Venciendo el sueño, asista a los talleres de la tarde, prepárese para el chocogami y ¡de por dios!
                          si se inscribió a las tarjetas, entréguelas que lo están buscando desde ayer.</li>
                      <li>Solo SI ES MAYOR DE EDAD, alístese para la chiva (hoy tampoco va a dormir).</li>
                    </ol>`
        },
        {
          title: 'Día 3',
          content: `<ol>
                      <li>Si logró levantarse nos vemos en el evento.</li>
                      <li>Todo lo demás como el día segundo.</li>
                      <li>Entrega de reconocimientos, clausura, chocolatada. Ud. sentirá una ligera nostalgia
                          que durará hasta el próximo evento.</li>
                    </ol>`
        },
        {
          title: 'Día 4',
          content: `Es probable que salgan planes, fuera de programa, esté pendiente en el WhatsApp del evento,
                    la emoción nos hace vernos hasta dos semanas seguidas, si le nace en alguno nos veremos.`
        }
      ],
    },
    activities: {
      title: 'Nuestras Actividades',
      subtitle: 'Navega por todo lo que tenemos preparado para ti',
      viewDetails: 'Ver detalles',
      prev: 'Anterior',
      next: 'Siguiente',
      items: [
        {
          title: 'Publica tus Diagramas: Deja tu Huella 📝',
          imageUrl: 'images/457442674_10233497359799729_1347389003187592882_n.jpg',
          icon: 'fas fa-book',
          content: "¿Creaste un modelo de origami increíble? ¡Es tu oportunidad de verlo publicado! Comparte tus diagramas originales en nuestro libro \"Páginas De Origami 2026\". Llegarás a origamistas de todo el mundo y tu creación será parte del libro oficial del evento. 🌍\n¿Cómo participar? Fácil: descarga las Bases de la convocatoria (<a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasES.docx'>español</a> o <a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasEN.docx'>inglés</a>), prepara tus diagramas y envíalos antes del 20 de mayo de 2026 a Camilo Torres: paginasdeorigami@gmail.com. ¡Anímate a compartir tu arte!",
        },
        {
          title: 'Comparte tu Talento: ¡Sé Tallerista! 🎨',
          imageUrl: 'images/61160257_10220581757310914_8555122383122333696_n-1.jpg',
          icon: 'fas fa-hands',
          content: '¿Te apasiona enseñar origami? ¡Este es tu momento! Inscríbete para ser tallerista en nuestras categorías (Básico, Intermedio, Avanzado, Kids) y comparte tu magia con otros plegadores. Al inscribirte, cuéntanos qué figuras geniales quieres enseñar, o si prefieres, ¡nos mandas los detalles más tarde! Anímate a inspirar a otros con tus pliegues. ✨',
        },
        {
          title: 'Rompe el Hielo con Pines Plegados 📌',
          imageUrl: 'images/289780022_2495040103971537_8568591026589863873_n-1.jpg',
          icon: 'fas fa-thumbtack',
          content: '¿Un poco tímido/a para empezar a charlar? ¡Tenemos la solución! Únete al intercambio de pines: dobla un montón de figuritas de origami chulas que se puedan usar como prendedor. Repártelas a quien quieras en la inauguración o durante todo el evento. ¡Es la excusa perfecta para conectar, hacer amigos y llevarte un recuerdo único! 😉',
        },
        {
          title: 'Chocogami: ¡El Reto más Dulce! 🍫',
          imageUrl: 'images/289282322_10230290849552152_1956165075611761127_n-1.jpg',
          icon: 'fas fa-cookie-bite',
          content: '¡Prepárate para un desafío delicioso y creativo! En Chocogami, destapas un chocolate colombiano popular, descubres una foto secreta y... ¡a plegar! La regla de oro: solo puedes usar el empaque del chocolate. Demuestra tu ingenio, compite por premios divertidos o simplemente pásalo genial viendo las creaciones (¡y comiendo chocolate!). ¿Te atreves?',
        },
        {
          title: 'Intercambio de Tarjetas (ATC): 🃏',
          imageUrl: 'images/AG-mariposas-1.png',
          icon: 'fas fa-exchange-alt',
          content: "¡Haz que tus ATC (Artist Trading Cards) sean inolvidables! Diseña y arma paquetes de tarjetas de origami (16 tarjetas por paquete, en grupos de 2). Al final, se intercambian paquetes de 16 o 32 tarjetas diferentes entre los participantes, ¡y todos se llevan una colección única! Además, participa en el concurso a la mejor tarjeta y deja que tu creatividad brille. Descarga las <a style='color: #be7e62' href='https://origamibogota.com/descargas/ATC.docx'>bases de la convocatoria</a> y empieza a plegar conexiones llenas de arte.",
        },
        {
          title: '¡Súbete a la Chiva Rumbera! 🚌🎶',
          imageUrl: 'images/f7f84ec16ebb55c406af906456176219-1.jpg',
          icon: 'fas fa-bus',
          content: '¿Listos para una noche de pura fiesta colombiana? La Chiva Rumbera es nuestro autobús colorido y musical para una escapada nocturna llena de baile y diversión. Es una actividad extra (¡y solo para adultos!) perfecta para soltar el esqueleto después de un día de plegado. ¡No te la pierdas si quieres rumba de la buena! ヾ(-.-)ゞ *(Actividad opcional, consulta detalles)*.',
        },
        {
          title: 'Encuentro con los invitados ✨',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-users',
          content: '¡Una oportunidad de oro! Tendremos clases especiales con nuestros invitados estrella (internacionales y nacionales). Imagina aprender sus secretos, escuchar sus historias y plegar un modelo especial directamente con ellos en un grupo grande. ¡Prepárate para una dosis concentrada de inspiración y conocimiento de los que más saben!',
        },
        {
          title: 'Talleres para Todos: ¡Encuentra tu Pliegue! 🤓',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-chalkboard-teacher',
          content: '¿Eres nuevo/a en el mundo del origami o ya eres súper pro plegando? ¡No importa! Nuestros talleres se dividen por niveles (Principiante, Intermedio, Experto) para que disfrutes aprendiendo figuras a tu ritmo. Lo mejor: muchos profes enseñan modelos creados por ellos mismos. ¡Son oportunidades únicas para aprender figuras que no encontrarás en otro lugar!',
        },
        {
          title: 'Exposición: ¡Muestra tu Arte al Mundo! 🤩',
          imageUrl: 'images/447852680_18270623236238474_4507690254501985740_n-1.jpg',
          icon: 'fas fa-eye',
          content: '¡Este es tu escenario! Trae tus mejores creaciones y exponlas para que todos las admiren. Recuerda ponerle una etiqueta con los datos clave (autor, plegador, tipo de papel...). Además, ¡tus modelos pueden ganar premios! Habrá votaciones durante todo el evento para elegir la mejor exposición (¡la creatividad cuenta!). No olvides votar por tus favoritas y dejar que tu trabajo inspire a otros.',
        },
        {
          title: 'Origami Kids: ¡Diversión para los Peques! 😊',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-child',
          content: '¡El futuro del origami está aquí! Tenemos un rincón especial para los niños y niñas, con talleres súper divertidos, juegos y figuras pensadas para sus manitas creativas. Y si te encanta enseñar y tienes un don con los peques, ¡anímate a ser profe voluntario en Origami Kids! Es una experiencia gratificante llena de risas y papelitos de colores.',
        },
        {
          title: 'Subasta Silenciosa: ¡Tesoros Escondidos! 🤫',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-gavel',
          content: '¿Buscas esa joya de origami que no encuentras en ningún lado? ¡Participa en nuestra Subasta Silenciosa! Podrás encontrar libros, papeles especiales, modelos exclusivos donados por artistas y muchas sorpresas más. Escribe tu oferta en secreto, cruza los dedos y ¡llévate a casa algo único! Además, ayudas a apoyar a la comunidad de origami.',
        },
        {
          title: 'Origami de Pasillo: ¡La Magia Espontánea! ✨',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-comments',
          content: 'A veces, los mejores descubrimientos ocurren fuera de las aulas. El "Origami de Pasillo" es ese momento mágico donde compartes un truco rápido, aprendes una figura de un nuevo amigo o simplemente charlas sobre papeles y pliegues en cualquier rincón del evento. ¡Mantén los ojos abiertos y el papel listo, la conexión y el aprendizaje suceden en todas partes!',
        },
        {
          title: 'Explora Bogotá: ¡Más Allá del Papel! 🌆',
          imageUrl: 'images/guatavita.jpeg',
          icon: 'fas fa-map-marked-alt',
          content: '¿Quieres aprovechar el viaje para conocer la capital? ¡Claro que sí! Te daremos tips y quizás organicemos algunos paseos opcionales para descubrir los encantos de Bogotá. Explora la cultura, prueba la comida local y llévate recuerdos que van más allá del origami. ¡Una oportunidad para estirar las piernas y ver la ciudad entre pliegue y pliegue! *(Consulta la programación para más detalles)*.',
        },
        {
          title: '¡Rifas y Sorteos Sorpresa! 🎯🎁',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-gift',
          content: '¡Mantente alerta y atento/a durante todo el evento! Organizaremos rifas y sorteos sorpresa en diferentes momentos. Podrías ganar libros de origami, papeles especiales, herramientas únicas y mucho más. La clave para no perderte nada: ¡estate pendiente a los anuncios y actividades! Participa en talleres, asiste a charlas y mantén los oídos bien abiertos. ¡La suerte sonríe a quienes están presentes y activos! No te quedes con las ganas de llevarte a casa un premio genial. 🍀✨',
        },
      ],
    },
    footer: {
      contact: 'Contáctanos',
      location: 'Ubicación del Evento',
      register: 'Inscríbete al Evento',
      registerText: 'Participa en el próximo Congreso de Origami Bogotá',
      registerBtn: 'Inscríbete Ahora',
      quickLinks: 'Enlaces rápidos',
      rights: '© 2026 Congreso Origami Bogotá. Todos los derechos reservados.',
      home: 'Inicio',
      inscriptions: 'Inscripciones',
      workshops: 'Talleres',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre el evento Origami Bogotá',
      contactText: '¿No encuentras lo que buscas?',
      contactLink: 'Contáctanos vía WhatsApp',
      items: [
        { id: 'faq1', icon: 'fas fa-ticket-alt', question: '¿Qué incluye la inscripción?', answer: 'Incluye la entrada al evento, talleres, caja del evento con materiales, refrigerios, espacio de exposición, cóctel de bienvenida y chocolatada de despedida. Menores pueden asistir con un acompañante.', column: 1 },
        { id: 'faq2', icon: 'fas fa-calendar-check', question: '¿Cuál es la diferencia entre la inscripción completa o por día?', answer: 'La inscripción completa es para asistir a todas las actividades. La inscripción por días es para asistir solo el sábado o domingo. Todos reciben el kit del evento.', column: 1 },
        { id: 'faq3', icon: 'fas fa-exchange-alt', question: '¿Cuántos grupos hay de intercambio de tarjetas?', answer: 'Esto depende de la cantidad de personas inscritas, a veces hay 2 y otras solo 1. La información será confirmada a las personas inscritas una semana antes del evento.', column: 1 },
        { id: 'faq4', icon: 'fas fa-chalkboard-teacher', question: '¿Cómo selecciono mis talleres?', answer: 'En la mañana de cada día, con tu número de inscripción, podrás seleccionar tus talleres en la página a partir de las 8 am. Es por cupos, así que ten listas varias opciones por si no hay cupo en tu preferido.', column: 1 },
        { id: 'faq5', icon: 'fas fa-sort-numeric-down', question: '¿Cómo se asignan los números para la inscripción?', answer: 'Los números se asignan por orden de inscripción, es decir, por la fecha de pago. Entre más temprano te inscribas, menor número tendrás.', column: 1 },
        { id: 'faq6', icon: 'fas fa-user-friends', question: '¿A qué tengo derecho como acompañante?', answer: 'Podrás visitar los espacios comunes del evento, pero no asistir a talleres ni recibir materiales o refrigerios.', column: 2 },
        { id: 'faq7', icon: 'fas fa-child', question: '¿Todos los menores de edad deben ir acompañados?', answer: 'El evento no exige acompañante para todos los menores, pero los organizadores no se harán responsables. Es decisión del acompañante estar presente o no.', column: 2 },
        { id: 'faq8', icon: 'fas fa-envelope', question: 'Si no llegó el correo con el número, ¿qué hago?', answer: 'Tendremos una lista impresa con los números. Te recomendamos agregar como contacto el correo inscripciones&#64;origamibogota.com para recibir toda la información.', column: 2 },
        { id: 'faq9', icon: 'fas fa-clock', question: '¿Cuáles son los horarios del evento?', answer: 'Consulta el cronograma en la sección "Acerca del evento" y haz clic en el botón "Cronograma".', column: 2 },
        { id: 'faq10', icon: 'fas fa-bus', question: '¿Quiénes pueden participar en la chiva?', answer: 'Adultos participantes del evento, parejas o amigos de participantes (todos mayores de edad) que paguen el valor adicional de la actividad (incluye copa y aguardiente).', column: 2 },
        { id: 'faq11', icon: 'fas fa-thumbtack', question: '¿Cuántos pines/prendedores debo hacer?', answer: 'Es una actividad libre, puedes hacer los que quieras regalar o intercambiar. El evento realiza 70 pines para todos los participantes que asistan al cóctel de bienvenida.', column: 3 },
        { id: 'faq12', icon: 'fas fa-box-open', question: '¿En qué momento reclamó mi kit?', answer: 'El viernes desde las 5pm hasta las 6pm o después del cóctel, Sábado o Domingo de 8am a 9am.', column: 3 },
        { id: 'faq13', icon: 'fas fa-calendar-times', question: '¿Qué pasa si no puedo asistir al evento?', answer: 'Podrás transferir tu inscripción a otra persona o reclamar el kit del evento. Las inscripciones no son reembolsables ni redimibles en ningún caso para eventos posteriores.', column: 3 },
        { id: 'faq14', icon: 'fas fa-map-marker-alt', question: '¿A dónde debo llegar?', answer: 'Dirígete a la oficina del evento para reclamar tu escarapela y kit del evento. El cóctel de bienvenida es en el auditorio Cra 8 #56-50.', column: 3 },
        { id: 'faq15', icon: 'fas fa-id-card', question: '¿Cómo organizo las tarjetas?', answer: 'Por lo general hay 2 grupos de tarjetas, se deben hacer sets de 16 tarjetas por cada grupo.', column: 3 },
      ],
    },
    banner3: {
      title: '¡Comparte tu Pasión! Sé Tallerista en Nuestro Evento',
      description: 'Buscamos mentes creativas como la tuya para inspirar y enseñar en nuestro próximo evento. Si tienes un modelo de origami para enseñar, que quieras compartir, ¡queremos conocer tu propuesta!',
      cta: 'Proponer un Taller Ahora',
    },
    resources: {
      title: 'Recursos del Evento',
      subtitle: 'Descarga todos los documentos con información relevante para el evento',
      downloadBtn: 'Descargar',
      items: [
        { name: 'Guía para Participantes', url: 'https://docs.google.com/document/d/1QUvn97FZU8NHgg4Rtj-nqs-ur0wTqFK2gFL5nJnh3qY/edit?tab=t.0' },
        { name: 'Cronograma', url: 'https://origamibogota.com/descargas/cronograma.pdf' },
        { name: 'Bases convocatoria de intercambio de tarjetas', url: 'https://origamibogota.com/descargas/ATC.docx' },
        { name: 'Bases convocatoria para diagramas en español', url: 'https://origamibogota.com/descargas/basesdiagramasES.docx' },
        { name: 'Base para convocatoria para diagramas en inglés', url: 'https://origamibogota.com/descargas/basesdiagramasEN.docx' },
      ],
    },
    sponsors: {
      title: 'Nuestros Patrocinadores',
    },
    workshopsInscriptions: {
      title: 'Inscríbete a los Talleres',
      subtitle: 'Convención de Origami Bogotá 2026',
      description1: 'Reserva tu lugar en los talleres especializados que se impartirán durante la convención. Aprende directamente de maestros reconocidos del origami.',
      description2: 'Consulta los menús de talleres disponibles para cada día y asegura tu participación en las actividades de tu interés.',
      registerBtn: 'Inscribir Talleres',
      bookletBtn: 'Ver Booklet',
      menuBtn: 'Menú PDF',
      countdownTitle: 'Inscripciones de Talleres',
      countdownSubtitle: 'Disponibles próximamente',
      availableIn: 'Disponible en',
      days: 'días',
      hours: 'horas',
      minutes: 'minutos',
    },
    inscriptions: {
      heroTitle: '¡Las inscripciones están abiertas!',
      howTitle: '¿Cómo realizo mi inscripción?',
      howDescription: 'En esta oportunidad, la inscripción se debe realizar siguiendo estos dos pasos.',
      step1Title: 'Paso I',
      step1Description: 'Realiza el pago de tu inscripción escogiendo cualquiera de nuestros métodos de pago, aprovecha las ofertas por etapas.',
      step1Btn: 'Métodos de pago',
      step2Title: 'Paso II',
      step2Description: 'Si ya escogiste y completaste tu pago, Regístrate en el formulario para que puedas acceder a los talleres.',
      step2Btn: 'Formulario de registro',
      pageTitle: 'PASO I',
      pageSubtitle: 'Realiza el pago de tu inscripción escogiendo cualquiera de nuestros métodos de pago, aprovecha las ofertas por etapas.',
      buyBtn: 'COMPRA AQUÍ',
      dailyTitle: 'Opciones por día',
      selectBtn: 'Seleccionar',
      earlyBirdName: 'Madrugadores',
      earlyBirdBadge: 'Oferta especial',
      earlyBirdDeadline: 'Hasta enero 15, 2026',
      phase2Deadline: 'Hasta Junio 14, 2026',
      includes: ['Kit de materiales', 'Refrigerios (no almuerzo)', 'Entrada a los talleres'],
      saturdayDay: 'Día Sábado',
      sundayDay: 'Día Domingo',
      saturdayDesc: 'Inscripción para participar en el evento el día viernes y sábado, con acceso a los talleres, conferencias y concursos. Incluye materiales y refrigerios (no almuerzo).',
      sundayDesc: 'Inscripción para participar en el evento el día viernes y domingo, con acceso a los talleres, conferencias y concursos. Incluye materiales y refrigerios (no almuerzo).',
      paymentInfoTitle: 'Información de pago',
      paymentInfoHtml: '<p>Serás redirigido al sitio de pagos en nuestro patrocinador origamistica.com.</p><p>Una vez realizado el pago, <strong>debes regresar a esta página</strong> para completar el formulario de inscripción por cada participante.</p>',
      continueBtn: 'Continuar al pago',
      cancelBtn: 'Cancelar',
      payMethodsTitle: 'Métodos de pago',
      payMethodsDesc: 'Puedes usar estos diferentes métodos. Recuerda completar el formulario de inscripción una vez realizado el pago para que puedas escoger los talleres.',
      payMethodsFooter: '¡Importante! Una vez realizado el pago, no olvides completar el formulario de inscripción para asegurar tu lugar y seleccionar los talleres a los que deseas asistir. ¡El último paso para ser parte de esta increíble experiencia!',
      mobileDesc: '+57 315 2459839',
      bankTitle: 'Depósito Bancario',
      bankDesc: 'Solicita la información de depósito bancario a través de whatsapp.',
      cardTitle: 'Tarjetas',
      cardDesc: 'Utilizando su tarjeta de crédito o débito en la tienda online.',
      cardLink: 'Click aquí',
      cashTitle: 'Efectivo',
      cashDesc: 'Comunicándose con nosotros por whatsapp',
      step2Header: 'PASO II',
      step2Subtitle: 'Una vez realizado el pago por alguno de los medios, debes formalizar la inscripción completando este formulario.',
      stepPersonal: 'Personal',
      stepContact: 'Contacto',
      stepPayment: 'Pago',
      stepParticip: 'Particip.',
      stepOptions: 'Opciones',
      stepOf: 'de',
      prevBtn: 'Anterior',
      nextBtn: 'Siguiente',
      submitBtn: 'Inscribirme',
      sendingBtn: 'Enviando...',
      successTitle: '¡Inscripción realizada con éxito!',
      successMsg: 'Hemos enviado un correo de confirmación a',
      successMsg2: 'con los detalles de tu inscripción.',
      checkEmail: 'Por favor revisa tu bandeja de entrada y la carpeta de spam.',
      newRegistration: 'Nueva inscripción',
      personalTitle: 'Información Personal',
      nameLabel: 'Nombre',
      lastnameLabel: 'Apellido',
      ageLabel: 'Edad',
      idnameLabel: 'Nombre en la escarapela',
      contactTitle: 'Información de Contacto',
      countryLabel: 'País',
      cityLabel: 'Ciudad',
      emailLabel: 'Correo electrónico',
      emailHint: 'Asegúrate de proporcionar un correo electrónico funcional, ya que recibirás información importante del evento.',
      phoneLabel: 'Teléfono',
      paymentTitle: 'Información de Pago',
      payTypeLabel: 'Tipo de pago / inscripción',
      selectOption: 'Seleccione',
      cashNote: '*Debes confirmar el método de pago en efectivo contactándonos antes de realizar el registro.',
      payDateLabel: 'Fecha de pago',
      receiptLabel: 'Número de comprobante',
      receiptHint: 'Aquí describe el tipo de beca, si eres becado por patrocinio indica la empresa, institución etc.',
      participTitle: 'Participación en Evento',
      participQuestion: '¿Cómo será tu participación?',
      allDays: 'Participaré todos los días',
      satOnly: 'Participaré sólo el día sábado',
      sunOnly: 'Participaré sólo el día domingo',
      companionLabel: 'Nombre de acompañante',
      companionHint: '*Ingresa esta información si el participante es menor de edad y necesita acompañante, o si el participante es mayor de edad y requiere asistencia adicional.',
      optionsTitle: 'Opciones de Participación',
      howHeardLabel: '¿Cómo se enteró del evento?',
      socialMedia: 'Redes Sociales',
      press: 'Prensa',
      tv: 'Televisión',
      referrals: 'Referidos',
      other: 'Otro',
      specifyPlaceholder: 'Especifica',
      printCertLabel: 'Deseo recibir certificado impreso',
      origamiGroupLabel: 'Pertenezco a un grupo de origami',
      origamiGroupPlaceholder: 'Especifica el nombre del grupo',
      cardsLabel: 'Participaré en el intercambio de tarjetas',
      cardsHint: 'Debes realizar 1 set de 16 tarjetas por cada grupo en el que desees participar.',
      cardsPlaceholder: 'Número de grupos',
      workshopsLabel: 'Deseo dictar talleres',
      workshopsHint: 'Una vez inscrito podrás agregar la información de tus talleres en',
      chivaLabel: 'Participaré en la chiva rumbera',
      chivaAdultsOnly: '(Sólo mayores de edad)',
      chivaCompanionsQuestion: '¿Llevarás acompañantes?',
      chivaNo: 'No, iré solo',
      chivaYes: 'Sí, llevaré acompañante(s)',
      companionsNumLabel: 'Número de acompañantes',
      companionsNumHint: 'Por favor indica cuántas personas te acompañarán (mínimo 2, máximo 9)',
      companionsNumPlaceholder: 'Ingresa el número de acompañantes',
      note1: '*Recuerda que es importante que formalices la inscripción para obtener tu número de asistente y recibir notificaciones.',
      note2: '*Recuerda generar el registro en este formulario por cada participante del evento que hayas confirmado en el pago.',
      note3: '*La información suministrada en este formulario es de uso exclusivo de origamibogota.com para recopilar información de asistencia y participantes del evento.',
      note4: "*Recuerda ingresar un correo electrónico real y funcional, agregar inscripciones@origamibogota.com como contacto y verificar la bandeja de entrada (o spam) de correo electrónico ya que estaremos enviando notificaciones sobre el evento a ese email suministrado.",
      valName: 'Debe ingresar el nombre',
      valLastname: 'Debe ingresar el apellido',
      valAge: 'Debe ingresar la edad',
      valIdname: 'Debe ingresar el nombre para la escarapela',
      valCountry: 'Debe seleccionar el país',
      valCity: 'Debe ingresar la ciudad',
      valEmail: 'Debe ingresar el correo electrónico',
      valEmailInvalid: 'El correo electrónico debe ser una dirección válida',
      valPhone: 'Debe ingresar el teléfono',
      valPhoneNumeric: 'El teléfono debe contener solo números',
      valPayMethod: 'Debe seleccionar el tipo de pago',
      valPayDate: 'Debe ingresar la fecha de pago',
      valReceipt: 'Debe ingresar el número de comprobante',
      valDays: 'Debe especificar el o los días que va a participar',
      valHowHeard: 'Debe seleccionar cómo se enteró del evento',
      valHowHeardSpecify: 'Debe especificar cómo se enteró del evento',
      valOrigamiGroup: 'Debe especificar el grupo de origami al que pertenece',
      valCardGroup: 'Debe especificar el número de grupos para el intercambio de tarjetas',
      valCardGroupRange: 'El número de grupos para intercambio de tarjetas debe ser 1 o 2',
      valChivaAccompanied: 'Debe indicar si irá solo o con acompañantes a la chiva rumbera',
      valChivaCompanions: 'Debe indicar cuántos acompañantes llevará a la chiva rumbera',
      valChivaMin: 'El número de acompañantes debe ser al menos 2',
      valChivaMax: 'El número máximo de acompañantes permitido es 3',
      chivaErrNum: 'Por favor ingresa un número válido',
      chivaErrMin: 'Debe ser al menos 2 acompañantes',
      chivaErrMax: 'El máximo permitido es de 3 acompañantes',
      alertTitle: 'Atención',
      submitError: 'Ocurrió un error al procesar la inscripción. Por favor, intente nuevamente.',
      submitErrorTitle: 'Error',
    },
    seo: {
      home: { title: 'Origami Bogotá 2026 | Congreso de Origami en Colombia', description: 'Origami Bogotá 2026: el congreso de origami más importante de Colombia. Del 12 al 14 de junio en el Liceo Francés Louis Pasteur, Bogotá.' },
      inscripciones: { title: 'Inscripciones | Origami Bogotá 2026', description: 'Inscríbete al Congreso Origami Bogotá 2026. Elige tu modalidad de participación, talleres y métodos de pago disponibles.' },
      talleres: { title: 'Talleres | Origami Bogotá 2026', description: 'Descubre los talleres de origami en el Congreso Origami Bogotá 2026. Aprende con maestros internacionales y nacionales.' },
      recursos: { title: 'Recursos y Preguntas Frecuentes | Origami Bogotá 2026', description: 'Preguntas frecuentes y recursos útiles para asistentes al Congreso Origami Bogotá 2026.' },
      amigosPlegadores: { title: 'Amigos Plegadores | Origami Bogotá 2026', description: 'Conoce a los amigos plegadores del Congreso Origami Bogotá 2026: maestros y entusiastas del origami de todo el mundo.' },
      booklet: { title: 'Booklet e Itinerario | Origami Bogotá 2026', description: 'Consulta el itinerario y la programación completa del Congreso Origami Bogotá 2026.' },
    },
  },

  // ─────────────── ENGLISH ───────────────
  en: {
    menu: {
      home: 'Home',
      about: 'About the Event',
      inscriptions: 'Open Registrations',
      guests: 'Guests',
      activities: 'Activities',
      workshops: 'Workshops',
      friends: 'Amigos Plegadores',
      publishDiagrams: 'Publish your diagrams',
      schedule: 'Workshop Schedule 2026',
      registerWorkshops: 'Register for Workshops',
      resources: 'FAQ & Resources',
      contact: 'Contact Us',
      location: 'Event Location',
      ob2025: 'Origami Bogotá 2025',
    },
    banner: {
      anniversary: '15 YEARS CELEBRATING THE ART OF ORIGAMI',
      venue: 'Liceo Francés Louis Pasteur',
      date: 'June 12–14, 2026',
    },
    banner2: {
      title: 'Welcome',
      description: 'Registrations are open for our next event! Don\'t miss the chance to learn with us.',
      cta: 'Open Registrations',
    },
    about: {
      title: 'About the Event',
      p1: 'Origami Bogotá is an event designed for everyone — young and old — who is passionate about paper folding. It is a space to meet people who share the same interests and love of folding origami. Origami Bogotá gives you the opportunity to learn new folding techniques and step into the world of origami, whether it\'s your first time or your tenth.',
      p2: 'During the event, folding happens everywhere — not just in workshops, but also over a cup of coffee or in a hallway. Over the years we have worked to ensure that all lovers of this art have a place at the event, so we offer spaces for adults at different skill levels (from beginners to advanced) and a separate space for children. It is exciting to see how more experienced participants create complex models and display them, showing the infinite possibilities and versatility of paper.',
    },
    guests: {
      title: 'Guests',
      description: 'Every year there is one international guest and one national guest, making this a unique opportunity for many to meet world-renowned origami artists in person...',
      international: 'International Guest',
      national: 'National Guest',
      items: [
        {
          type: 'International Guest',
          biography: 'Joseph Wu is a Vancouver-based artist who discovered origami at age three and has been designing original models since age eleven. An international reference in the art, he has taught classes and lectures, exhibited his work in museums, and actively participated in the global origami community.\n\nHis work has been featured in media such as The New York Times, and he has collaborated with brands and audiovisual productions. Among his most notable works are the light sculpture at Botanist restaurant and the "Jelly Swarm" installation at the Vancouver Aquarium.',
        },
        {
          type: 'National Guest',
          biography: 'Diana Milena Vargas Rodríguez is a Colombian origami artist dedicated to designing origami models, particularly in the field of modular and geometric origami. Her work is characterized by creating three-dimensional structures made from multiple paper modules, in which she explores patterns, symmetries, and complex visual compositions.\n\nThroughout her career, she has designed various original models, including stars, cubes, and kusudamas, which have been shared at international origami conventions and repositories. Her creations reflect a particular interest in geometric aesthetics and the potential of paper folding as a form of creativity, precision, and artistic expression.\n\nIn addition to her work as a designer, she has participated in spaces for dissemination and teaching of origami, contributing to promote this practice as a tool for learning, art, and mathematical exploration.',
        },
      ],
    },
    itinerary: {
      title: 'The Itinerary!',
      subtitle: "Everything you need to know to survive the most paper-folded weekend of the year",
      viewBtn: 'View full itinerary',
      modalTitle: 'The itinerary',
      closeBtn: 'Close',
      attribution: 'The itinerary: Camilo Torres.',
      days: [
        {
          title: 'Day —',
          content: `We know you're already crossing off days on your calendar one by one, systematically folding models from the digital book,
                    venting your anxiety in the WhatsApp group, and desperately waiting — we can only do one event a year, sorry.`
        },
        {
          title: 'A few months before',
          content: `Registrations are open already, for crying out loud! Sign up now — it's cheaper
                    and you get a better pick of workshops.`
        },
        {
          title: '60 days before',
          content: `We're still in last year's WhatsApp group. Some overachiever will start asking about pins —
                    don't panic, but don't get too comfortable either. It's not tomorrow, but it's not that far off.
                    Time to start thinking about pins, cards, and your personal expo. Okay fine, panic a little, get it out of your system, then start folding.`
        },
        {
          title: '1 day before',
          content: `You can still pull an all-nighter and put that anxiety to good use — if you haven't started yet,
                    you can at least show up with 10 pins. Calling dibs on one. Nothing beats a pin made with anxiety and adrenaline.
                    Pack your bag and get ready for the weekend you've been waiting so long for.`
        },
        {
          title: 'Day 1',
          content: `<ol>
                      <li>Survive the night before the event kicks off (sleep is important, even if the anxiety won't let you).</li>
                      <li>On the big day, make your way to the venue — if you prefer arriving a couple hours early,
                          you'll almost certainly run into another anxious origamist in the area. You can grab lunch together (in extreme cases, breakfast),
                          have a coffee, and wait until 3 — we've learned our lesson: you can't set up the expo in half an hour.</li>
                      <li>Pick up your kit, and if you folded something for the Expo, head over to set it up; Alejo Erazo will be there waiting for you —
                          be patient. Calmly go through your kit contents (start making a mental list of what you'll need to fill the box for the next day).</li>
                      <li>Ready for the canelazo and the opening ceremony — by this point you've probably already folded something in the hallways
                          and caught up with old friends, or found your crew for the weekend.</li>
                      <li>Brace yourself — you're not sleeping tonight either.</li>
                      <li>Please sleep! … See you on Day 2.</li>
                    </ol>`
        },
        {
          title: 'Day 2',
          content: `<ol start="0">
                      <li>Since you couldn't fall asleep early and finally drifted off around 4 AM, you'd better hurry — you're going to be late.</li>
                      <li>While commuting to the event on the bus, taxi, Uber, bike, teleportation, or sprinting —
                          open the app and pick your workshops. Don't panic if it won't let you in; it might just not be your turn yet.
                          And if you're the one driving — pull over to sign up. No phones while driving.</li>
                      <li>Spend the whole day folding, and mentally prepare for the group photo. If you were smart, you already know where you're having lunch.
                          If not, no worries — there are groups who've already scoped out the area, just tag along with whoever looks most appealing.</li>
                      <li>Powering through the sleepiness, show up for the afternoon workshops, gear up for Chocogami,
                          and for the love of all things papery — if you signed up for the cards, please turn them in, they've been looking for you since yesterday.</li>
                      <li>ADULTS ONLY: get ready for the Chiva (yeah, you're not sleeping tonight either).</li>
                    </ol>`
        },
        {
          title: 'Day 3',
          content: `<ol>
                      <li>If you managed to get up, see you at the event.</li>
                      <li>Everything else: same as Day 2.</li>
                      <li>Awards ceremony, closing, hot chocolate. You will feel a faint nostalgia that will last until the next event.</li>
                    </ol>`
        },
        {
          title: 'Day 4',
          content: `There will probably be plans after the event — keep an eye on the event WhatsApp.
                    The excitement tends to keep us seeing each other for up to two weeks straight.
                    If you feel like joining any of them, we'll see you there.`
        }
      ],
    },
    activities: {
      title: 'Our Activities',
      subtitle: 'Browse everything we have prepared for you',
      viewDetails: 'See details',
      prev: 'Previous',
      next: 'Next',
      items: [
        {
          title: 'Publish Your Diagrams: Leave Your Mark 📝',
          imageUrl: 'images/457442674_10233497359799729_1347389003187592882_n.jpg',
          icon: 'fas fa-book',
          content: "Did you create an amazing origami model? This is your chance to see it published! Share your original diagrams in our book \"Páginas De Origami 2026\". You'll reach origami artists worldwide and your creation will be part of the official event book. 🌍\nHow to participate? Easy: download the Call for Submissions guidelines (<a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasES.docx'>Spanish</a> or <a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasEN.docx'>English</a>), prepare your diagrams and send them before May 20, 2026 to Camilo Torres: paginasdeorigami@gmail.com. Go ahead and share your art!",
        },
        {
          title: 'Share Your Talent: Be a Workshop Teacher! 🎨',
          imageUrl: 'images/61160257_10220581757310914_8555122383122333696_n-1.jpg',
          icon: 'fas fa-hands',
          content: 'Are you passionate about teaching origami? This is your moment! Sign up to be a workshop teacher in our categories (Basic, Intermediate, Advanced, Kids) and share your magic with other folders. When registering, tell us what cool figures you want to teach — or if you prefer, send us the details later! Go ahead and inspire others with your folds. ✨',
        },
        {
          title: 'Break the Ice with Folded Pins 📌',
          imageUrl: 'images/289780022_2495040103971537_8568591026589863873_n-1.jpg',
          icon: 'fas fa-thumbtack',
          content: 'Feeling a little shy about starting a conversation? We have the solution! Join the pin exchange: fold a bunch of cute origami figurines that can be worn as brooches. Hand them out to whoever you want at the opening or throughout the entire event. It\'s the perfect excuse to connect, make friends and take home a unique souvenir! 😉',
        },
        {
          title: 'Chocogami: The Sweetest Challenge! 🍫',
          imageUrl: 'images/289282322_10230290849552152_1956165075611761127_n-1.jpg',
          icon: 'fas fa-cookie-bite',
          content: 'Get ready for a delicious and creative challenge! In Chocogami, you unwrap a popular Colombian chocolate bar, discover a secret photo and... start folding! The golden rule: you can only use the chocolate wrapper. Show off your ingenuity, compete for fun prizes or simply have a great time watching the creations (and eating chocolate!). Do you dare?',
        },
        {
          title: 'Artist Trading Cards (ATC) Exchange: 🃏',
          imageUrl: 'images/AG-mariposas-1.png',
          icon: 'fas fa-exchange-alt',
          content: "Make your ATCs (Artist Trading Cards) unforgettable! Design and assemble origami card packets (16 cards per packet, in groups of 2). At the end, packets of 16 or 32 different cards are exchanged between participants, and everyone takes home a unique collection! Also enter the contest for best card and let your creativity shine. Download the <a style='color: #be7e62' href='https://origamibogota.com/descargas/ATC.docx'>submission guidelines</a> and start folding connections full of art.",
        },
        {
          title: 'Jump on the Party Bus! 🚌🎶',
          imageUrl: 'images/f7f84ec16ebb55c406af906456176219-1.jpg',
          icon: 'fas fa-bus',
          content: 'Ready for a night of pure Colombian party? The Chiva Rumbera is our colorful, musical bus for a night out full of dancing and fun. It\'s an extra activity (adults only!) perfect for letting loose after a day of folding. Don\'t miss it if you want some serious fun! ヾ(-.-)ゞ *(Optional activity, check details)*.',
        },
        {
          title: 'Meet the Guests ✨',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-users',
          content: 'A golden opportunity! We will have special classes with our star guests (international and national). Imagine learning their secrets, hearing their stories and folding a special model directly with them in a large group. Get ready for a concentrated dose of inspiration and knowledge from those who know best!',
        },
        {
          title: 'Workshops for Everyone: Find Your Fold! 🤓',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-chalkboard-teacher',
          content: 'Are you new to the world of origami or already a super-pro folder? It doesn\'t matter! Our workshops are divided by level (Beginner, Intermediate, Expert) so you can enjoy learning figures at your own pace. The best part: many teachers teach models they created themselves. These are unique opportunities to learn figures you won\'t find anywhere else!',
        },
        {
          title: 'Exhibition: Show Your Art to the World! 🤩',
          imageUrl: 'images/447852680_18270623236238474_4507690254501985740_n-1.jpg',
          icon: 'fas fa-eye',
          content: 'This is your stage! Bring your best creations and display them for everyone to admire. Remember to put a label with the key details (author, folder, paper type...). Your models can also win prizes! There will be votes throughout the event to choose the best exhibition (creativity counts!). Don\'t forget to vote for your favorites and let your work inspire others.',
        },
        {
          title: 'Origami Kids: Fun for the Little Ones! 😊',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-child',
          content: 'The future of origami is here! We have a special corner for children, with super fun workshops, games and figures designed for their creative little hands. And if you love teaching and have a gift with kids, go ahead and become a volunteer teacher at Origami Kids! It\'s a rewarding experience full of laughter and colorful paper.',
        },
        {
          title: 'Silent Auction: Hidden Treasures! 🤫',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-gavel',
          content: 'Looking for that origami gem you can\'t find anywhere? Join our Silent Auction! You\'ll find books, specialty papers, exclusive models donated by artists and many more surprises. Write your bid in secret, cross your fingers and take home something unique! You\'ll also be supporting the origami community.',
        },
        {
          title: 'Hallway Origami: The Spontaneous Magic! ✨',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-comments',
          content: 'Sometimes the best discoveries happen outside the classrooms. "Hallway Origami" is that magical moment where you share a quick trick, learn a figure from a new friend or simply chat about papers and folds in any corner of the event. Keep your eyes open and your paper ready — connection and learning happen everywhere!',
        },
        {
          title: 'Explore Bogotá: Beyond the Paper! 🌆',
          imageUrl: 'images/guatavita.jpeg',
          icon: 'fas fa-map-marked-alt',
          content: 'Want to make the most of your trip to explore the capital? Of course! We\'ll give you tips and maybe organize some optional tours to discover Bogotá\'s charms. Explore the culture, try the local food and take home memories that go beyond origami. A chance to stretch your legs and see the city between folds! *(Check the schedule for more details)*.',
        },
        {
          title: 'Raffles and Surprise Draws! 🎯🎁',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-gift',
          content: 'Stay alert and attentive throughout the event! We will organize raffles and surprise draws at different moments. You could win origami books, specialty papers, unique tools and much more. The key to not missing anything: stay tuned for announcements and activities! Join workshops, attend talks and keep your ears wide open. Luck smiles on those who are present and active! Don\'t miss out on taking home a great prize. 🍀✨',
        },
      ],
    },
    footer: {
      contact: 'Contact Us',
      location: 'Event Location',
      register: 'Register for the Event',
      registerText: 'Join the next Origami Bogotá Congress',
      registerBtn: 'Register Now',
      quickLinks: 'Quick Links',
      rights: '© 2026 Congreso Origami Bogotá. All rights reserved.',
      home: 'Home',
      inscriptions: 'Registrations',
      workshops: 'Workshops',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about the Origami Bogotá event',
      contactText: "Can't find what you're looking for?",
      contactLink: 'Contact us via WhatsApp',
      items: [
        { id: 'faq1', icon: 'fas fa-ticket-alt', question: 'What does the registration include?', answer: 'It includes entry to the event, workshops, event box with materials, refreshments, exhibition space, welcome cocktail and farewell hot chocolate. Minors may attend with a companion.', column: 1 },
        { id: 'faq2', icon: 'fas fa-calendar-check', question: 'What is the difference between a full registration and a single-day registration?', answer: 'The full registration allows you to attend all activities. A single-day registration is for Saturday or Sunday only. All attendees receive the event kit.', column: 1 },
        { id: 'faq3', icon: 'fas fa-exchange-alt', question: 'How many artist trading card groups are there?', answer: 'This depends on the number of registered participants; sometimes there are 2 groups and sometimes just 1. The information will be confirmed to registered participants one week before the event.', column: 1 },
        { id: 'faq4', icon: 'fas fa-chalkboard-teacher', question: 'How do I select my workshops?', answer: 'On the morning of each day, using your registration number, you can select your workshops on the website starting at 8 am. Spots are limited, so have several options ready in case your first choice is full.', column: 1 },
        { id: 'faq5', icon: 'fas fa-sort-numeric-down', question: 'How are registration numbers assigned?', answer: 'Numbers are assigned in order of registration, i.e., by payment date. The earlier you register, the lower your number will be.', column: 1 },
        { id: 'faq6', icon: 'fas fa-user-friends', question: 'What am I entitled to as a companion?', answer: 'You may visit the common areas of the event, but may not attend workshops or receive materials or refreshments.', column: 2 },
        { id: 'faq7', icon: 'fas fa-child', question: 'Do all minors need to be accompanied?', answer: 'The event does not require a companion for all minors, but the organizers will not be held responsible. It is the companion\'s decision whether to stay or not.', column: 2 },
        { id: 'faq8', icon: 'fas fa-envelope', question: "What if I didn't receive the email with my number?", answer: 'We will have a printed list with the numbers. We recommend adding inscripciones&#64;origamibogota.com to your contacts to receive all information.', column: 2 },
        { id: 'faq9', icon: 'fas fa-clock', question: 'What are the event hours?', answer: 'Check the schedule in the "About the Event" section and click the "Schedule" button.', column: 2 },
        { id: 'faq10', icon: 'fas fa-bus', question: 'Who can participate in the Chiva?', answer: 'Adult event participants, partners or friends of participants (all of legal age) who pay the additional activity fee (includes a drink and aguardiente).', column: 2 },
        { id: 'faq11', icon: 'fas fa-thumbtack', question: 'How many pins/brooches should I make?', answer: 'It is a free activity; you can make as many as you want to give away or exchange. The event makes 70 pins for all participants attending the welcome cocktail.', column: 3 },
        { id: 'faq12', icon: 'fas fa-box-open', question: 'When can I pick up my kit?', answer: 'Friday from 5pm to 6pm or after the cocktail; Saturday or Sunday from 8am to 9am.', column: 3 },
        { id: 'faq13', icon: 'fas fa-calendar-times', question: 'What happens if I cannot attend the event?', answer: 'You may transfer your registration to another person or pick up the event kit. Registrations are non-refundable and non-redeemable for future events under any circumstances.', column: 3 },
        { id: 'faq14', icon: 'fas fa-map-marker-alt', question: 'Where should I go when I arrive?', answer: 'Head to the event office to collect your badge and event kit. The welcome cocktail is held at the auditorium at Cra 8 #56-50.', column: 3 },
        { id: 'faq15', icon: 'fas fa-id-card', question: 'How do I organize the cards?', answer: 'There are usually 2 card groups; sets of 16 cards must be made for each group.', column: 3 },
      ],
    },
    banner3: {
      title: 'Share Your Passion! Be a Workshop Teacher at Our Event',
      description: 'We are looking for creative minds like yours to inspire and teach at our upcoming event. If you have an origami model you want to share and teach, we want to hear your proposal!',
      cta: 'Propose a Workshop Now',
    },
    resources: {
      title: 'Event Resources',
      subtitle: 'Download all documents with relevant information for the event',
      downloadBtn: 'Download',
      items: [
        { name: 'Participant Guide', url: 'https://docs.google.com/document/d/1QUvn97FZU8NHgg4Rtj-nqs-ur0wTqFK2gFL5nJnh3qY/edit?tab=t.0' },
        { name: 'Schedule', url: 'https://origamibogota.com/descargas/cronograma.pdf' },
        { name: 'Artist Trading Cards Call for Entries', url: 'https://origamibogota.com/descargas/ATC.docx' },
        { name: 'Call for Diagrams in Spanish', url: 'https://origamibogota.com/descargas/basesdiagramasES.docx' },
        { name: 'Call for Diagrams in English', url: 'https://origamibogota.com/descargas/basesdiagramasEN.docx' },
      ],
    },
    sponsors: {
      title: 'Our Sponsors',
    },
    workshopsInscriptions: {
      title: 'Register for Workshops',
      subtitle: 'Origami Bogotá Convention 2026',
      description1: 'Reserve your spot in the specialized workshops that will be held during the convention. Learn directly from renowned origami masters.',
      description2: 'Check the available workshop menus for each day and secure your participation in the activities of your interest.',
      registerBtn: 'Register for Workshops',
      bookletBtn: 'View Booklet',
      menuBtn: 'PDF Menu',
      countdownTitle: 'Workshop Registrations',
      countdownSubtitle: 'Coming soon',
      availableIn: 'Available in',
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
    },
    inscriptions: {
      heroTitle: 'Registrations are open!',
      howTitle: 'How do I register?',
      howDescription: 'This time, registration must be completed following these two steps.',
      step1Title: 'Step I',
      step1Description: 'Make your registration payment by choosing any of our payment methods. Take advantage of early-bird pricing.',
      step1Btn: 'Payment methods',
      step2Title: 'Step II',
      step2Description: 'Once you have chosen and completed your payment, register in the form to access the workshops.',
      step2Btn: 'Registration form',
      pageTitle: 'STEP I',
      pageSubtitle: 'Make your registration payment by choosing any of our payment methods. Take advantage of early-bird pricing.',
      buyBtn: 'BUY HERE',
      dailyTitle: 'Day options',
      selectBtn: 'Select',
      earlyBirdName: 'Early Bird',
      earlyBirdBadge: 'Special offer',
      earlyBirdDeadline: 'Until January 15, 2026',
      phase2Deadline: 'Until June 14, 2026',
      includes: ['Materials kit', 'Snacks (no lunch)', 'Access to workshops'],
      saturdayDay: 'Saturday',
      sundayDay: 'Sunday',
      saturdayDesc: 'Registration to participate in the event on Friday and Saturday, with access to workshops, conferences and competitions. Includes materials and snacks (no lunch).',
      sundayDesc: 'Registration to participate in the event on Friday and Sunday, with access to workshops, conferences and competitions. Includes materials and snacks (no lunch).',
      paymentInfoTitle: 'Payment information',
      paymentInfoHtml: '<p>You will be redirected to the payment site at our sponsor origamistica.com.</p><p>Once payment is completed, <strong>you must return to this page</strong> to complete the registration form for each participant.</p>',
      continueBtn: 'Continue to payment',
      cancelBtn: 'Cancel',
      payMethodsTitle: 'Payment methods',
      payMethodsDesc: 'You can use any of these methods. Remember to complete the registration form once payment is done so you can choose your workshops.',
      payMethodsFooter: 'Important! Once payment is made, don\'t forget to complete the registration form to secure your spot and select the workshops you wish to attend. The last step to be part of this amazing experience!',
      mobileDesc: '+57 315 2459839',
      bankTitle: 'Bank Transfer',
      bankDesc: 'Request bank transfer details via WhatsApp.',
      cardTitle: 'Cards',
      cardDesc: 'Using your credit or debit card in the online store.',
      cardLink: 'Click here',
      cashTitle: 'Cash',
      cashDesc: 'Contact us via WhatsApp',
      step2Header: 'STEP II',
      step2Subtitle: 'Once payment has been made through any of the methods, you must formalize your registration by completing this form.',
      stepPersonal: 'Personal',
      stepContact: 'Contact',
      stepPayment: 'Payment',
      stepParticip: 'Particip.',
      stepOptions: 'Options',
      stepOf: 'of',
      prevBtn: 'Previous',
      nextBtn: 'Next',
      submitBtn: 'Register',
      sendingBtn: 'Sending...',
      successTitle: 'Registration successful!',
      successMsg: 'We have sent a confirmation email to',
      successMsg2: 'with your registration details.',
      checkEmail: 'Please check your inbox and spam folder.',
      newRegistration: 'New registration',
      personalTitle: 'Personal Information',
      nameLabel: 'First name',
      lastnameLabel: 'Last name',
      ageLabel: 'Age',
      idnameLabel: 'Name for badge',
      contactTitle: 'Contact Information',
      countryLabel: 'Country',
      cityLabel: 'City',
      emailLabel: 'Email address',
      emailHint: 'Make sure to provide a working email address, as you will receive important event information.',
      phoneLabel: 'Phone',
      paymentTitle: 'Payment Information',
      payTypeLabel: 'Payment / registration type',
      selectOption: 'Select',
      cashNote: '*You must confirm the cash payment method by contacting us before completing your registration.',
      payDateLabel: 'Payment date',
      receiptLabel: 'Receipt number',
      receiptHint: 'Describe the scholarship type here; if sponsored, indicate the company or institution.',
      participTitle: 'Event Participation',
      participQuestion: 'How will you participate?',
      allDays: 'I will attend all days',
      satOnly: 'Saturday only',
      sunOnly: 'Sunday only',
      companionLabel: 'Companion name',
      companionHint: '*Enter this information if the participant is a minor and needs a companion, or if the participant is an adult requiring additional assistance.',
      optionsTitle: 'Participation Options',
      howHeardLabel: 'How did you hear about the event?',
      socialMedia: 'Social Media',
      press: 'Press',
      tv: 'Television',
      referrals: 'Referrals',
      other: 'Other',
      specifyPlaceholder: 'Please specify',
      printCertLabel: 'I want to receive a printed certificate',
      origamiGroupLabel: 'I belong to an origami group',
      origamiGroupPlaceholder: 'Specify the group name',
      cardsLabel: 'I will participate in the card exchange',
      cardsHint: 'You must make 1 set of 16 cards per group you wish to participate in.',
      cardsPlaceholder: 'Number of groups',
      workshopsLabel: 'I want to teach workshops',
      workshopsHint: 'Once registered you can add your workshop information at',
      chivaLabel: 'I will join the Chiva Rumbera',
      chivaAdultsOnly: '(Adults only)',
      chivaCompanionsQuestion: 'Will you bring companions?',
      chivaNo: 'No, I\'ll go alone',
      chivaYes: 'Yes, I\'ll bring companion(s)',
      companionsNumLabel: 'Number of companions',
      companionsNumHint: 'Please indicate how many people will accompany you (minimum 2, maximum 9)',
      companionsNumPlaceholder: 'Enter the number of companions',
      note1: '*Remember it is important to formalize your registration to get your attendee number and receive notifications.',
      note2: '*Remember to submit this form for each event participant you confirmed in your payment.',
      note3: '*The information provided in this form is used exclusively by origamibogota.com to collect event attendance and participant data.',
      note4: '*Remember to enter a real, working email address, add inscripciones@origamibogota.com as a contact and check your inbox (or spam folder) as we will be sending event notifications to that email.',
      valName: 'Please enter your first name',
      valLastname: 'Please enter your last name',
      valAge: 'Please enter your age',
      valIdname: 'Please enter the name for your badge',
      valCountry: 'Please select your country',
      valCity: 'Please enter your city',
      valEmail: 'Please enter your email address',
      valEmailInvalid: 'The email address must be a valid address',
      valPhone: 'Please enter your phone number',
      valPhoneNumeric: 'Phone number must contain only digits',
      valPayMethod: 'Please select the payment type',
      valPayDate: 'Please enter the payment date',
      valReceipt: 'Please enter the receipt number',
      valDays: 'Please specify which day(s) you will attend',
      valHowHeard: 'Please select how you heard about the event',
      valHowHeardSpecify: 'Please specify how you heard about the event',
      valOrigamiGroup: 'Please specify the origami group you belong to',
      valCardGroup: 'Please specify the number of groups for the card exchange',
      valCardGroupRange: 'The number of groups for card exchange must be 1 or 2',
      valChivaAccompanied: 'Please indicate whether you will go alone or with companions to the Chiva Rumbera',
      valChivaCompanions: 'Please indicate how many companions you will bring to the Chiva Rumbera',
      valChivaMin: 'The number of companions must be at least 2',
      valChivaMax: 'The maximum number of companions allowed is 3',
      chivaErrNum: 'Please enter a valid number',
      chivaErrMin: 'Must be at least 2 companions',
      chivaErrMax: 'The maximum allowed is 3 companions',
      alertTitle: 'Attention',
      submitError: 'An error occurred while processing the registration. Please try again.',
      submitErrorTitle: 'Error',
    },
    seo: {
      home: { title: 'Origami Bogotá 2026 | Origami Convention in Colombia', description: 'Origami Bogotá 2026: Colombia\'s premier origami convention. June 12–14 at the Liceo Francés Louis Pasteur, Bogotá.' },
      inscripciones: { title: 'Registrations | Origami Bogotá 2026', description: 'Register for the Origami Bogotá 2026 Convention. Choose your participation package, workshops, and payment method.' },
      talleres: { title: 'Workshops | Origami Bogotá 2026', description: 'Discover the origami workshops at Origami Bogotá 2026. Learn from international and national origami masters.' },
      recursos: { title: 'Resources & FAQ | Origami Bogotá 2026', description: 'Frequently asked questions and useful resources for attendees of the Origami Bogotá 2026 Convention.' },
      amigosPlegadores: { title: 'Folding Friends | Origami Bogotá 2026', description: 'Meet the folding friends of Origami Bogotá 2026: origami masters and enthusiasts from around the world.' },
      booklet: { title: 'Booklet & Schedule | Origami Bogotá 2026', description: 'View the full schedule and itinerary for the Origami Bogotá 2026 Convention.' },
    },
  },

  // ─────────────── PORTUGUÊS ───────────────
  pt: {
    menu: {
      home: 'Início',
      about: 'Sobre o Evento',
      inscriptions: 'Inscrições Abertas',
      guests: 'Convidados',
      activities: 'Atividades',
      workshops: 'Oficinas',
      friends: 'Amigos Plegadores',
      publishDiagrams: 'Publique seus diagramas',
      schedule: 'Programação de Oficinas 2026',
      registerWorkshops: 'Inscrever-se nas Oficinas',
      resources: 'Perguntas e Recursos',
      contact: 'Fale Conosco',
      location: 'Local do Evento',
      ob2025: 'Origami Bogotá 2025',
    },
    banner: {
      anniversary: '15 ANOS CELEBRANDO A ARTE DO ORIGAMI',
      venue: 'Liceo Francés Louis Pasteur',
      date: '12 a 14 de Junho de 2026',
    },
    banner2: {
      title: 'Bem-vindos',
      description: 'Inscrições abertas para o nosso próximo evento! Não perca a oportunidade de aprender conosco.',
      cta: 'Inscrições Abertas',
    },
    about: {
      title: 'Sobre o Evento',
      p1: 'O Origami Bogotá é um evento pensado para todos os apaixonados — grandes e pequenos — por dobrar papel. É um espaço para conhecer pessoas com os mesmos interesses e paixão pelo origami. O Origami Bogotá dá a possibilidade de aprender novas técnicas de dobradura e se introduzir no mundo do origami, seja pela primeira vez ou pela décima.',
      p2: 'Durante o evento, dobra-se em diferentes espaços — não apenas nas oficinas, mas também enquanto se toma um café ou se passa por um corredor. Ao longo dos anos trabalhamos para que todos os amantes desta arte tenham um lugar no evento, por isso oferecemos espaços para adultos com diferentes níveis de complexidade (desde iniciantes até avançados) e um espaço separado para crianças. É muito emocionante ver como pessoas mais experientes criam modelos complexos e os expõem, mostrando as infinitas possibilidades e versatilidade do papel.',
    },
    guests: {
      title: 'Convidados',
      description: 'A cada ano há um convidado internacional e um nacional, tornando esta uma oportunidade única para muitos de conhecer pessoalmente origamistas mundialmente reconhecidos...',
      international: 'Convidado Internacional',
      national: 'Convidado Nacional',
      items: [
        {
          type: 'Convidado Internacional',
          biography: 'Joseph Wu é um artista de Vancouver que descobriu o origami aos três anos e cria designs originais desde os onze. É uma referência internacional: ministrou aulas e conferências, expôs sua obra em museus e participou ativamente da comunidade global do origami.\n\nSeu trabalho foi publicado em meios como o The New York Times, e ele colaborou com marcas e produções audiovisuais. Entre suas obras mais notáveis estão a escultura luminosa do restaurante Botanist e a instalação "Jelly Swarm" no Aquário de Vancouver.',
        },
        {
          type: 'Convidada Nacional',
          biography: 'Diana Milena Vargas Rodríguez é uma artista de origami colombiana dedicada ao design de modelos de origami, especialmente no campo do origami modular e geométrico. Seu trabalho se caracteriza pela criação de estruturas tridimensionais elaboradas a partir de múltiplos módulos de papel, nas quais explora padrões, simetrias e composições visuais complexas.\n\nAo longo de sua trajetória, projetou diversos modelos originais, incluindo estrelas, cubos e kusudamas, que foram compartilhados em convenções e repositórios internacionais de origami. Suas criações refletem um interesse particular pela estética geométrica e pelo potencial da dobradura de papel como forma de criatividade, precisão e expressão artística.\n\nAlém de seu trabalho como designer, participou de espaços de divulgação e ensino do origami, contribuindo para promover esta prática como ferramenta de aprendizagem, arte e exploração matemática.',
        },
      ],
    },
    itinerary: {
      title: 'O Itinerário!',
      subtitle: "Tudo o que você precisa saber para sobreviver ao fim de semana mais dobrado do ano",
      viewBtn: 'Ver itinerário completo',
      modalTitle: 'O itinerário',
      closeBtn: 'Fechar',
      attribution: 'O itinerário: Camilo Torres.',
      days: [
        {
          title: 'Dia —',
          content: `Já sabemos que você está riscando os dias que faltam pro evento um a um no calendário,
                    dobrando sistematicamente os modelos do livro digital, descarregando sua ansiedade no grupo do WhatsApp
                    e tendo paciência — só conseguimos fazer um evento por ano.`
        },
        {
          title: 'Uns meses antes',
          content: `As inscrições já estão abertas, pelo amor de Deus! Se inscreva já, que sai mais barato
                    e você pega uma vez melhor pra escolher os workshops.`
        },
        {
          title: '60 dias antes',
          content: `Ainda estamos no grupo do WhatsApp do ano passado. Alguém mais animado vai começar a perguntar pelos pins —
                    não entre em pânico, mas também não fique relaxado, não é amanhã mas também não tem tanto tempo.
                    É hora de começar a pensar nos pins, nos cartões e na sua expo pessoal. Tá bom, entre em pânico, supere e comece a dobrar.`
        },
        {
          title: '1 dia antes',
          content: `Ainda dá pra virar a noite e aproveitar a ansiedade — se não começou antes, dá pra chegar com pelo menos 10 pins.
                    Já to pedindo um. Nada como um pin feito com ansiedade e adrenalina.
                    Arrume a mochila e se prepare pro fim de semana que você tanto esperou.`
        },
        {
          title: 'Dia 1',
          content: `<ol>
                      <li>Sobreviva à noite antes do evento começar (dormir é importante, mesmo que a ansiedade não deixe).</li>
                      <li>Na data indicada, vá até o local — se preferir chegar umas horas antes de tudo começar,
                          vai encontrar algum origamista ansioso pela região. Podem almoçar juntos (em casos extremos, tomar café da manhã),
                          tomar um café e esperar até às 3h (já aprendemos: em meia hora não se monta a expo).</li>
                      <li>Pegue seu kit e se dobrou algo pra Expo, vá montar; Alejo Erazo vai estar te esperando —
                          não entre em desespero e tenha paciência. Veja o conteúdo do kit com calma
                          (faça uma lista mental do que vai precisar pra completar a caixa no dia seguinte).</li>
                      <li>Pronto pro canelinha e a abertura — a essa altura já dobrou algo nos corredores,
                          já pôs o papo em dia com os amigos de sempre, ou encontrou sua turma do fim de semana.</li>
                      <li>Se prepare pra não dormir essa noite também.</li>
                      <li>Dorme, por favor! … Nos vemos no Dia 2.</li>
                    </ol>`
        },
        {
          title: 'Dia 2',
          content: `<ol start="0">
                      <li>Como não conseguiu dormir cedo e finalmente conseguiu pegar no sono tipo 4h da manhã, corre que vai chegar atrasado.</li>
                      <li>Enquanto se desloca pro evento de ônibus, taxi, Uber, bici, teletransporte ou correndo —
                          entre no site e selecione os workshops. Não entre em pânico se não deixar entrar, talvez ainda não seja a sua vez.
                          E se você é quem tá dirigindo — para o carro pra se inscrever. Não use o celular enquanto dirige.</li>
                      <li>Passe o dia todo dobrando, prepare-se mentalmente pra foto em grupo. Se foi precavido, já sabe onde vai almoçar.
                          Se não, relaxa: tem grupos que já mapearam a região — grude no que parecer mais interessante.</li>
                      <li>Vencendo o sono, apareça nos workshops da tarde, se prepare pro Chocogami e, pelo amor de Deus —
                          se se inscreveu nas cartas, entregue-as, estão te procurando desde ontem.</li>
                      <li>Apenas SE FOR MAIOR DE IDADE, se prepare pra chiva rumbera (hoje também não vai dormir).</li>
                    </ol>`
        },
        {
          title: 'Dia 3',
          content: `<ol>
                      <li>Se conseguiu se levantar, a gente se vê no evento.</li>
                      <li>Todo o resto: igual ao Dia 2.</li>
                      <li>Entrega de reconhecimentos, encerramento, chocolatada. Você vai sentir uma leve nostalgia que vai durar até o próximo evento.</li>
                    </ol>`
        },
        {
          title: 'Dia 4',
          content: `É bem provável que surjam planos fora do programa — fique de olho no WhatsApp do evento.
                    A emoção nos faz nos encontrar por até duas semanas seguidas.
                    Se tiver afim de algum, a gente se vê lá.`
        }
      ],
    },
    activities: {
      title: 'Nossas Atividades',
      subtitle: 'Explore tudo o que preparamos para você',
      viewDetails: 'Ver detalhes',
      prev: 'Anterior',
      next: 'Próximo',
      items: [
        {
          title: 'Publique Seus Diagramas: Deixe Sua Marca 📝',
          imageUrl: 'images/457442674_10233497359799729_1347389003187592882_n.jpg',
          icon: 'fas fa-book',
          content: "Criou um modelo de origami incrível? É sua chance de vê-lo publicado! Compartilhe seus diagramas originais no nosso livro \"Páginas De Origami 2026\". Você alcançará origamistas de todo o mundo e sua criação será parte do livro oficial do evento. 🌍\nComo participar? Fácil: baixe as Bases do edital (<a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasES.docx'>espanhol</a> ou <a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasEN.docx'>inglês</a>), prepare seus diagramas e envie antes de 20 de maio de 2026 para Camilo Torres: paginasdeorigami@gmail.com. Anime-se a compartilhar sua arte!",
        },
        {
          title: 'Compartilhe Seu Talento: Seja Instrutor! 🎨',
          imageUrl: 'images/61160257_10220581757310914_8555122383122333696_n-1.jpg',
          icon: 'fas fa-hands',
          content: 'Você tem paixão por ensinar origami? Este é o seu momento! Inscreva-se para ser instrutor em nossas categorias (Básico, Intermediário, Avançado, Kids) e compartilhe sua magia com outros papelistas. Ao se inscrever, conte-nos que figuras incríveis quer ensinar — ou se preferir, mande os detalhes depois! Anime-se a inspirar outros com seus dobrados. ✨',
        },
        {
          title: 'Quebre o Gelo com Alfinetes Dobrados 📌',
          imageUrl: 'images/289780022_2495040103971537_8568591026589863873_n-1.jpg',
          icon: 'fas fa-thumbtack',
          content: 'Um pouco tímido para começar a conversar? Temos a solução! Participe da troca de alfinetes: dobre um monte de figurinhas de origami legais que possam ser usadas como broches. Distribua-as para quem quiser na abertura ou durante todo o evento. É a desculpa perfeita para se conectar, fazer amigos e levar para casa uma lembrança única! 😉',
        },
        {
          title: 'Chocogami: O Desafio Mais Doce! 🍫',
          imageUrl: 'images/289282322_10230290849552152_1956165075611761127_n-1.jpg',
          icon: 'fas fa-cookie-bite',
          content: 'Prepare-se para um desafio delicioso e criativo! No Chocogami, você abre um chocolate colombiano popular, descobre uma foto secreta e... começa a dobrar! A regra de ouro: só pode usar a embalagem do chocolate. Demonstre seu engenho, compita por prêmios divertidos ou simplesmente divirta-se vendo as criações (e comendo chocolate!). Você aceita o desafio?',
        },
        {
          title: 'Troca de Cartões (ATC): 🃏',
          imageUrl: 'images/AG-mariposas-1.png',
          icon: 'fas fa-exchange-alt',
          content: "Faça seus ATCs (Artist Trading Cards) inesquecíveis! Projete e monte pacotes de cartões de origami (16 cartões por pacote, em grupos de 2). No final, pacotes de 16 ou 32 cartões diferentes são trocados entre os participantes, e todos levam para casa uma coleção única! Além disso, participe do concurso do melhor cartão e deixe sua criatividade brilhar. Baixe as <a style='color: #be7e62' href='https://origamibogota.com/descargas/ATC.docx'>bases do edital</a> e comece a dobrar conexões cheias de arte.",
        },
        {
          title: 'Embarque na Chiva Rumbera! 🚌🎶',
          imageUrl: 'images/f7f84ec16ebb55c406af906456176219-1.jpg',
          icon: 'fas fa-bus',
          content: 'Prontos para uma noite de pura festa colombiana? A Chiva Rumbera é o nosso ônibus colorido e musical para uma saída noturna cheia de dança e diversão. É uma atividade extra (apenas para adultos!) perfeita para soltar o esqueleto depois de um dia de dobradura. Não perca se quiser se divertir muito! ヾ(-.-)ゞ *(Atividade opcional, consulte detalhes)*.',
        },
        {
          title: 'Encontro com os Convidados ✨',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-users',
          content: 'Uma oportunidade de ouro! Teremos aulas especiais com nossos convidados estrela (internacionais e nacionais). Imagine aprender seus segredos, ouvir suas histórias e dobrar um modelo especial diretamente com eles em um grande grupo. Prepare-se para uma dose concentrada de inspiração e conhecimento de quem mais entende!',
        },
        {
          title: 'Oficinas para Todos: Encontre Seu Dobrado! 🤓',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-chalkboard-teacher',
          content: 'Você é novo no mundo do origami ou já é um superpro? Não importa! Nossas oficinas são divididas por nível (Iniciante, Intermediário, Especialista) para que você aprenda figuras no seu ritmo. O melhor: muitos professores ensinam modelos criados por eles mesmos. São oportunidades únicas para aprender figuras que você não encontrará em outro lugar!',
        },
        {
          title: 'Exposição: Mostre Sua Arte ao Mundo! 🤩',
          imageUrl: 'images/447852680_18270623236238474_4507690254501985740_n-1.jpg',
          icon: 'fas fa-eye',
          content: 'Este é o seu palco! Traga suas melhores criações e exponha-as para que todos as admirem. Lembre-se de colocar uma etiqueta com os dados principais (autor, dobrador, tipo de papel...). Além disso, seus modelos podem ganhar prêmios! Haverá votações durante todo o evento para escolher a melhor exposição (a criatividade conta!). Não se esqueça de votar nas suas favoritas e deixar que seu trabalho inspire outros.',
        },
        {
          title: 'Origami Kids: Diversão para os Pequenos! 😊',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-child',
          content: 'O futuro do origami está aqui! Temos um cantinho especial para as crianças, com oficinas super divertidas, jogos e figuras pensadas para suas mãozinhas criativas. E se você adora ensinar e tem talento com os pequenos, anime-se a ser professor voluntário no Origami Kids! É uma experiência gratificante cheia de risadas e papéis coloridos.',
        },
        {
          title: 'Leilão Silencioso: Tesouros Escondidos! 🤫',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-gavel',
          content: 'Está procurando aquela joia de origami que não encontra em lugar nenhum? Participe do nosso Leilão Silencioso! Você poderá encontrar livros, papéis especiais, modelos exclusivos doados por artistas e muitas surpresas mais. Escreva sua oferta em segredo, cruze os dedos e leve para casa algo único! Além disso, você ajuda a apoiar a comunidade de origami.',
        },
        {
          title: 'Origami de Corredor: A Magia Espontânea! ✨',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-comments',
          content: 'Às vezes, as melhores descobertas acontecem fora das salas de aula. O "Origami de Corredor" é aquele momento mágico onde você compartilha um truque rápido, aprende uma figura de um novo amigo ou simplesmente conversa sobre papéis e dobras em qualquer canto do evento. Fique de olhos abertos e com o papel pronto — a conexão e o aprendizado acontecem em todo lugar!',
        },
        {
          title: 'Explore Bogotá: Além do Papel! 🌆',
          imageUrl: 'images/guatavita.jpeg',
          icon: 'fas fa-map-marked-alt',
          content: 'Quer aproveitar a viagem para conhecer a capital? Claro que sim! Daremos dicas e talvez organizemos alguns passeios opcionais para descobrir os encantos de Bogotá. Explore a cultura, experimente a comida local e leve para casa memórias que vão além do origami. Uma oportunidade para esticar as pernas e ver a cidade entre um dobrado e outro! *(Consulte a programação para mais detalhes)*.',
        },
        {
          title: 'Sorteios e Brindes Surpresa! 🎯🎁',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-gift',
          content: 'Fique atento durante todo o evento! Organizaremos sorteios e brindes surpresa em diferentes momentos. Você poderia ganhar livros de origami, papéis especiais, ferramentas únicas e muito mais. A chave para não perder nada: fique ligado nos anúncios e atividades! Participe das oficinas, assista às palestras e mantenha os ouvidos bem abertos. A sorte sorri para quem está presente e ativo! Não perca a chance de levar para casa um prêmio incrível. 🍀✨',
        },
      ],
    },
    footer: {
      contact: 'Fale Conosco',
      location: 'Local do Evento',
      register: 'Inscreva-se no Evento',
      registerText: 'Participe do próximo Congresso de Origami Bogotá',
      registerBtn: 'Inscreva-se Agora',
      quickLinks: 'Links Rápidos',
      rights: '© 2026 Congresso Origami Bogotá. Todos os direitos reservados.',
      home: 'Início',
      inscriptions: 'Inscrições',
      workshops: 'Oficinas',
    },
    faq: {
      title: 'Perguntas Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre o evento Origami Bogotá',
      contactText: 'Não encontrou o que procura?',
      contactLink: 'Fale conosco via WhatsApp',
      items: [
        { id: 'faq1', icon: 'fas fa-ticket-alt', question: 'O que inclui a inscrição?', answer: 'Inclui a entrada no evento, oficinas, caixa do evento com materiais, lanches, espaço de exposição, coquetel de boas-vindas e chocolate de despedida. Menores podem participar com um acompanhante.', column: 1 },
        { id: 'faq2', icon: 'fas fa-calendar-check', question: 'Qual é a diferença entre a inscrição completa e a por dia?', answer: 'A inscrição completa é para participar de todas as atividades. A inscrição por dia é apenas para o sábado ou domingo. Todos recebem o kit do evento.', column: 1 },
        { id: 'faq3', icon: 'fas fa-exchange-alt', question: 'Quantos grupos há de troca de cartões?', answer: 'Isso depende da quantidade de pessoas inscritas; às vezes há 2 grupos e às vezes apenas 1. A informação será confirmada aos inscritos uma semana antes do evento.', column: 1 },
        { id: 'faq4', icon: 'fas fa-chalkboard-teacher', question: 'Como seleciono minhas oficinas?', answer: 'Na manhã de cada dia, com seu número de inscrição, você poderá selecionar suas oficinas no site a partir das 8h. As vagas são limitadas, portanto tenha várias opções prontas caso sua primeira escolha esteja cheia.', column: 1 },
        { id: 'faq5', icon: 'fas fa-sort-numeric-down', question: 'Como são atribuídos os números de inscrição?', answer: 'Os números são atribuídos por ordem de inscrição, ou seja, pela data de pagamento. Quanto mais cedo você se inscrever, menor será o seu número.', column: 1 },
        { id: 'faq6', icon: 'fas fa-user-friends', question: 'A que tenho direito como acompanhante?', answer: 'Você poderá visitar as áreas comuns do evento, mas não poderá participar das oficinas nem receber materiais ou lanches.', column: 2 },
        { id: 'faq7', icon: 'fas fa-child', question: 'Todos os menores de idade precisam de acompanhante?', answer: 'O evento não exige acompanhante para todos os menores, mas os organizadores não se responsabilizarão. Cabe ao acompanhante decidir se estará presente ou não.', column: 2 },
        { id: 'faq8', icon: 'fas fa-envelope', question: 'E se não recebi o e-mail com o número?', answer: 'Teremos uma lista impressa com os números. Recomendamos adicionar como contato o e-mail inscripciones&#64;origamibogota.com para receber todas as informações.', column: 2 },
        { id: 'faq9', icon: 'fas fa-clock', question: 'Quais são os horários do evento?', answer: 'Consulte a programação na seção "Sobre o Evento" e clique no botão "Programação".', column: 2 },
        { id: 'faq10', icon: 'fas fa-bus', question: 'Quem pode participar da Chiva Rumbera?', answer: 'Adultos participantes do evento, casais ou amigos de participantes (todos maiores de idade) que paguem o valor adicional da atividade (inclui bebida e aguardiente).', column: 2 },
        { id: 'faq11', icon: 'fas fa-thumbtack', question: 'Quantos alfinetes/broches devo fazer?', answer: 'É uma atividade livre; você pode fazer quantos quiser para dar ou trocar. O evento confecciona 70 alfinetes para todos os participantes que comparecerem ao coquetel de boas-vindas.', column: 3 },
        { id: 'faq12', icon: 'fas fa-box-open', question: 'Quando posso retirar meu kit?', answer: 'Sexta-feira das 17h às 18h ou após o coquetel; Sábado ou Domingo das 8h às 9h.', column: 3 },
        { id: 'faq13', icon: 'fas fa-calendar-times', question: 'O que acontece se eu não puder comparecer ao evento?', answer: 'Você poderá transferir sua inscrição para outra pessoa ou retirar o kit do evento. As inscrições não são reembolsáveis nem aplicáveis a eventos futuros em nenhuma hipótese.', column: 3 },
        { id: 'faq14', icon: 'fas fa-map-marker-alt', question: 'Para onde devo ir ao chegar?', answer: 'Dirija-se ao escritório do evento para retirar seu crachá e kit do evento. O coquetel de boas-vindas é no auditório da Cra 8 #56-50.', column: 3 },
        { id: 'faq15', icon: 'fas fa-id-card', question: 'Como organizo os cartões?', answer: 'Geralmente há 2 grupos de cartões; devem-se fazer conjuntos de 16 cartões por grupo.', column: 3 },
      ],
    },
    banner3: {
      title: 'Compartilhe Sua Paixão! Seja Instrutor no Nosso Evento',
      description: 'Buscamos mentes criativas como a sua para inspirar e ensinar no nosso próximo evento. Se você tem um modelo de origami para ensinar e quer compartilhar, queremos conhecer sua proposta!',
      cta: 'Propor uma Oficina Agora',
    },
    resources: {
      title: 'Recursos do Evento',
      subtitle: 'Baixe todos os documentos com informações relevantes para o evento',
      downloadBtn: 'Baixar',
      items: [
        { name: 'Guia para Participantes', url: 'https://docs.google.com/document/d/1QUvn97FZU8NHgg4Rtj-nqs-ur0wTqFK2gFL5nJnh3qY/edit?tab=t.0' },
        { name: 'Programação', url: 'https://origamibogota.com/descargas/cronograma.pdf' },
        { name: 'Edital de troca de cartões', url: 'https://origamibogota.com/descargas/ATC.docx' },
        { name: 'Edital para diagramas em espanhol', url: 'https://origamibogota.com/descargas/basesdiagramasES.docx' },
        { name: 'Edital para diagramas em inglês', url: 'https://origamibogota.com/descargas/basesdiagramasEN.docx' },
      ],
    },
    sponsors: {
      title: 'Nossos Patrocinadores',
    },
    workshopsInscriptions: {
      title: 'Inscreva-se nas Oficinas',
      subtitle: 'Convenção de Origami Bogotá 2026',
      description1: 'Reserve seu lugar nas oficinas especializadas que serão realizadas durante a convenção. Aprenda diretamente com mestres reconhecidos do origami.',
      description2: 'Consulte os menus de oficinas disponíveis para cada dia e garanta sua participação nas atividades de seu interesse.',
      registerBtn: 'Inscrever-se nas Oficinas',
      bookletBtn: 'Ver Booklet',
      menuBtn: 'Menu PDF',
      countdownTitle: 'Inscrições nas Oficinas',
      countdownSubtitle: 'Em breve',
      availableIn: 'Disponível em',
      days: 'dias',
      hours: 'horas',
      minutes: 'minutos',
    },
    inscriptions: {
      heroTitle: 'As inscrições estão abertas!',
      howTitle: 'Como faço minha inscrição?',
      howDescription: 'Desta vez, a inscrição deve ser realizada seguindo estes dois passos.',
      step1Title: 'Passo I',
      step1Description: 'Realize o pagamento da sua inscrição escolhendo qualquer um dos nossos métodos de pagamento. Aproveite as ofertas por etapas.',
      step1Btn: 'Métodos de pagamento',
      step2Title: 'Passo II',
      step2Description: 'Se já escolheu e concluiu o pagamento, registre-se no formulário para acessar as oficinas.',
      step2Btn: 'Formulário de registro',
      pageTitle: 'PASSO I',
      pageSubtitle: 'Realize o pagamento da sua inscrição escolhendo qualquer um dos nossos métodos de pagamento. Aproveite as ofertas por etapas.',
      buyBtn: 'COMPRE AQUI',
      dailyTitle: 'Opções por dia',
      selectBtn: 'Selecionar',
      earlyBirdName: 'Madrugadores',
      earlyBirdBadge: 'Oferta especial',
      earlyBirdDeadline: 'Até 15 de janeiro de 2026',
      phase2Deadline: 'Até 14 de junho de 2026',
      includes: ['Kit de materiais', 'Lanches (sem almoço)', 'Acesso às oficinas'],
      saturdayDay: 'Sábado',
      sundayDay: 'Domingo',
      saturdayDesc: 'Inscrição para participar do evento na sexta-feira e sábado, com acesso às oficinas, conferências e concursos. Inclui materiais e lanches (sem almoço).',
      sundayDesc: 'Inscrição para participar do evento na sexta-feira e domingo, com acesso às oficinas, conferências e concursos. Inclui materiais e lanches (sem almoço).',
      paymentInfoTitle: 'Informações de pagamento',
      paymentInfoHtml: '<p>Você será redirecionado ao site de pagamentos do nosso patrocinador origamistica.com.</p><p>Após o pagamento, <strong>você deve retornar a esta página</strong> para preencher o formulário de inscrição para cada participante.</p>',
      continueBtn: 'Continuar ao pagamento',
      cancelBtn: 'Cancelar',
      payMethodsTitle: 'Métodos de pagamento',
      payMethodsDesc: 'Você pode usar qualquer um destes métodos. Lembre-se de preencher o formulário de inscrição após o pagamento para poder escolher as oficinas.',
      payMethodsFooter: 'Importante! Após o pagamento, não esqueça de preencher o formulário de inscrição para garantir seu lugar e selecionar as oficinas. O último passo para fazer parte desta incrível experiência!',
      mobileDesc: '+57 315 2459839',
      bankTitle: 'Depósito Bancário',
      bankDesc: 'Solicite as informações de depósito bancário via WhatsApp.',
      cardTitle: 'Cartões',
      cardDesc: 'Utilizando seu cartão de crédito ou débito na loja online.',
      cardLink: 'Clique aqui',
      cashTitle: 'Dinheiro',
      cashDesc: 'Entrando em contato conosco via WhatsApp',
      step2Header: 'PASSO II',
      step2Subtitle: 'Após o pagamento por qualquer um dos meios, você deve formalizar a inscrição preenchendo este formulário.',
      stepPersonal: 'Pessoal',
      stepContact: 'Contato',
      stepPayment: 'Pagamento',
      stepParticip: 'Particip.',
      stepOptions: 'Opções',
      stepOf: 'de',
      prevBtn: 'Anterior',
      nextBtn: 'Próximo',
      submitBtn: 'Inscrever-me',
      sendingBtn: 'Enviando...',
      successTitle: 'Inscrição realizada com sucesso!',
      successMsg: 'Enviamos um e-mail de confirmação para',
      successMsg2: 'com os detalhes da sua inscrição.',
      checkEmail: 'Por favor, verifique sua caixa de entrada e a pasta de spam.',
      newRegistration: 'Nova inscrição',
      personalTitle: 'Informações Pessoais',
      nameLabel: 'Nome',
      lastnameLabel: 'Sobrenome',
      ageLabel: 'Idade',
      idnameLabel: 'Nome no crachá',
      contactTitle: 'Informações de Contato',
      countryLabel: 'País',
      cityLabel: 'Cidade',
      emailLabel: 'E-mail',
      emailHint: 'Certifique-se de fornecer um endereço de e-mail funcional, pois você receberá informações importantes do evento.',
      phoneLabel: 'Telefone',
      paymentTitle: 'Informações de Pagamento',
      payTypeLabel: 'Tipo de pagamento / inscrição',
      selectOption: 'Selecione',
      cashNote: '*Você deve confirmar o método de pagamento em dinheiro entrando em contato conosco antes de realizar o registro.',
      payDateLabel: 'Data do pagamento',
      receiptLabel: 'Número do comprovante',
      receiptHint: 'Descreva o tipo de bolsa aqui; se patrocinado, indique a empresa ou instituição.',
      participTitle: 'Participação no Evento',
      participQuestion: 'Como será sua participação?',
      allDays: 'Participarei todos os dias',
      satOnly: 'Somente no sábado',
      sunOnly: 'Somente no domingo',
      companionLabel: 'Nome do acompanhante',
      companionHint: '*Insira essas informações se o participante for menor de idade e precisar de acompanhante, ou se o participante for adulto e precisar de assistência adicional.',
      optionsTitle: 'Opções de Participação',
      howHeardLabel: 'Como ficou sabendo do evento?',
      socialMedia: 'Redes Sociais',
      press: 'Imprensa',
      tv: 'Televisão',
      referrals: 'Indicação',
      other: 'Outro',
      specifyPlaceholder: 'Especifique',
      printCertLabel: 'Desejo receber certificado impresso',
      origamiGroupLabel: 'Pertenço a um grupo de origami',
      origamiGroupPlaceholder: 'Especifique o nome do grupo',
      cardsLabel: 'Participarei do intercâmbio de cartões',
      cardsHint: 'Você deve fazer 1 conjunto de 16 cartões por grupo em que deseja participar.',
      cardsPlaceholder: 'Número de grupos',
      workshopsLabel: 'Desejo ministrar oficinas',
      workshopsHint: 'Após a inscrição, você poderá adicionar suas oficinas em',
      chivaLabel: 'Participarei da Chiva Rumbera',
      chivaAdultsOnly: '(Somente maiores de idade)',
      chivaCompanionsQuestion: 'Você levará acompanhantes?',
      chivaNo: 'Não, irei sozinho(a)',
      chivaYes: 'Sim, levarei acompanhante(s)',
      companionsNumLabel: 'Número de acompanhantes',
      companionsNumHint: 'Por favor, indique quantas pessoas o acompanharão (mínimo 2, máximo 9)',
      companionsNumPlaceholder: 'Insira o número de acompanhantes',
      note1: '*Lembre-se de que é importante formalizar sua inscrição para obter seu número de participante e receber notificações.',
      note2: '*Lembre-se de enviar este formulário para cada participante do evento que você confirmou no pagamento.',
      note3: '*As informações fornecidas neste formulário são de uso exclusivo do origamibogota.com para coletar dados de presença e participantes do evento.',
      note4: '*Lembre-se de inserir um e-mail real e funcional, adicionar inscripciones@origamibogota.com como contato e verificar a caixa de entrada (ou spam), pois enviaremos notificações do evento para esse e-mail.',
      valName: 'Por favor, insira seu nome',
      valLastname: 'Por favor, insira seu sobrenome',
      valAge: 'Por favor, insira sua idade',
      valIdname: 'Por favor, insira o nome para o crachá',
      valCountry: 'Por favor, selecione seu país',
      valCity: 'Por favor, insira sua cidade',
      valEmail: 'Por favor, insira seu endereço de e-mail',
      valEmailInvalid: 'O endereço de e-mail deve ser um endereço válido',
      valPhone: 'Por favor, insira seu telefone',
      valPhoneNumeric: 'O telefone deve conter apenas números',
      valPayMethod: 'Por favor, selecione o tipo de pagamento',
      valPayDate: 'Por favor, insira a data do pagamento',
      valReceipt: 'Por favor, insira o número do comprovante',
      valDays: 'Por favor, especifique em qual(is) dia(s) vai participar',
      valHowHeard: 'Por favor, selecione como ficou sabendo do evento',
      valHowHeardSpecify: 'Por favor, especifique como ficou sabendo do evento',
      valOrigamiGroup: 'Por favor, especifique o grupo de origami ao qual pertence',
      valCardGroup: 'Por favor, especifique o número de grupos para o intercâmbio de cartões',
      valCardGroupRange: 'O número de grupos para intercâmbio de cartões deve ser 1 ou 2',
      valChivaAccompanied: 'Por favor, indique se irá sozinho(a) ou com acompanhantes à Chiva Rumbera',
      valChivaCompanions: 'Por favor, indique quantos acompanhantes levará à Chiva Rumbera',
      valChivaMin: 'O número de acompanhantes deve ser no mínimo 2',
      valChivaMax: 'O número máximo de acompanhantes permitido é 3',
      chivaErrNum: 'Por favor, insira um número válido',
      chivaErrMin: 'Deve ser pelo menos 2 acompanhantes',
      chivaErrMax: 'O máximo permitido é de 3 acompanhantes',
      alertTitle: 'Atenção',
      submitError: 'Ocorreu um erro ao processar a inscrição. Por favor, tente novamente.',
      submitErrorTitle: 'Erro',
    },
    seo: {
      home: { title: 'Origami Bogotá 2026 | Convenção de Origami na Colômbia', description: 'Origami Bogotá 2026: a principal convenção de origami da Colômbia. De 12 a 14 de junho no Liceo Francés Louis Pasteur, Bogotá.' },
      inscripciones: { title: 'Inscrições | Origami Bogotá 2026', description: 'Inscreva-se na Convenção Origami Bogotá 2026. Escolha sua modalidade de participação, ateliês e formas de pagamento.' },
      talleres: { title: 'Ateliês | Origami Bogotá 2026', description: 'Descubra os ateliês de origami da Convenção Origami Bogotá 2026. Aprenda com mestres internacionais e nacionais.' },
      recursos: { title: 'Recursos e Perguntas Frequentes | Origami Bogotá 2026', description: 'Perguntas frequentes e recursos úteis para participantes da Convenção Origami Bogotá 2026.' },
      amigosPlegadores: { title: 'Amigos Dobradeiros | Origami Bogotá 2026', description: 'Conheça os amigos dobradeiros da Convenção Origami Bogotá 2026: mestres e entusiastas do origami de todo o mundo.' },
      booklet: { title: 'Booklet e Programação | Origami Bogotá 2026', description: 'Consulte o itinerário e a programação completa da Convenção Origami Bogotá 2026.' },
    },
  },

  // ─────────────── FRANÇAIS ───────────────
  fr: {
    menu: {
      home: 'Accueil',
      about: 'À propos de l\'événement',
      inscriptions: 'Inscriptions ouvertes',
      guests: 'Invités',
      activities: 'Activités',
      workshops: 'Ateliers',
      friends: 'Amigos Plegadores',
      publishDiagrams: 'Publiez vos diagrammes',
      schedule: 'Programme des ateliers 2026',
      registerWorkshops: 'S\'inscrire aux ateliers',
      resources: 'FAQ & Ressources',
      contact: 'Contactez-nous',
      location: 'Lieu de l\'événement',
      ob2025: 'Origami Bogotá 2025',
    },
    banner: {
      anniversary: '15 ANS À CÉLÉBRER L\'ART DE L\'ORIGAMI',
      venue: 'Liceo Francés Louis Pasteur',
      date: '12–14 juin 2026',
    },
    banner2: {
      title: 'Bienvenue',
      description: 'Les inscriptions sont ouvertes pour notre prochain événement ! Ne manquez pas l\'occasion d\'apprendre avec nous.',
      cta: 'Inscriptions ouvertes',
    },
    about: {
      title: 'À propos de l\'événement',
      p1: 'Origami Bogotá est un événement conçu pour tous — jeunes et moins jeunes — passionnés par le pliage du papier. C\'est un espace pour rencontrer des personnes qui partagent les mêmes intérêts et le même amour du pliage. Origami Bogotá vous donne l\'opportunité d\'apprendre de nouvelles techniques de pliage et d\'entrer dans le monde de l\'origami, que ce soit votre première ou votre dixième fois.',
      p2: 'Pendant l\'événement, le pliage se passe partout — pas seulement dans les ateliers, mais aussi autour d\'une tasse de café ou dans un couloir. Au fil des années, nous avons travaillé pour que tous les amoureux de cet art aient une place à l\'événement, c\'est pourquoi nous proposons des espaces dédiés aux adultes, adaptés à tous les niveaux, du débutant à l’avancé, ainsi qu’un espace distinct spécialement réservé aux enfants. Il est passionnant de voir comment les participants les plus expérimentés créent des modèles complexes et les exposent, montrant les possibilités infinies et la versatilité du papier.',
    },
    guests: {
      title: 'Invités',
      description: 'Chaque année, il y a un invité international et un invité national, ce qui est une opportunité unique pour beaucoup de rencontrer des artistes d\'origami de renommée mondiale en personne...',
      international: 'Invité international',
      national: 'Invité national',
      items: [
        {
          type: 'Invité international',
          biography: 'Joseph Wu est un artiste basé à Vancouver qui a découvert l\'origami à l\'âge de trois ans et crée des modèles originaux depuis l\'âge de onze ans. Référence internationale dans l\'art, il a donné des cours et des conférences, exposé ses œuvres dans des musées et participé activement à la communauté mondiale de l\'origami.\n\nSon travail a été présenté dans des médias tels que The New York Times, et il a collaboré avec des marques et des productions audiovisuelles. Parmi ses œuvres les plus notables figurent la sculpture lumineuse du restaurant Botanist et l\'installation « Jelly Swarm » à l\'Aquarium de Vancouver.',
        },
        {
          type: 'Invitée nationale',
          biography: 'Diana Milena Vargas Rodríguez est une artiste colombienne d\'origami dédiée à la création de modèles d\'origami, en particulier dans le domaine de l\'origami modulaire et géométrique. Son travail se caractérise par la création de structures tridimensionnelles élaborées à partir de multiples modules de papier, dans lesquelles elle explore des motifs, des symétries et des compositions visuelles complexes.\n\nTout au long de sa carrière, elle a conçu divers modèles originaux, notamment des étoiles, des cubes et des kusudamas, qui ont été partagés lors de conventions et dans des dépôts internationaux d\'origami. Ses créations reflètent un intérêt particulier pour l\'esthétique géométrique et le potentiel du pliage de papier comme forme de créativité, de précision et d\'expression artistique.\n\nEn plus de son travail en tant que designer, elle a participé à des espaces de diffusion et d\'enseignement de l\'origami, contribuant à promouvoir cette pratique comme outil d\'apprentissage, d\'art et d\'exploration mathématique.',
        },
      ],
    },
    itinerary: {
      title: 'Le programme !',
      subtitle: 'Tout ce que vous devez savoir pour survivre au week-end le plus plié de l\'année',
      viewBtn: 'Voir le programme complet',
      modalTitle: 'Le programme',
      closeBtn: 'Fermer',
      attribution: 'Le programme : Camilo Torres.',
      days: [
        {
          title: 'Jour —',
          content: `On sait déjà que vous rayez les jours restants avant l'événement un à un sur votre calendrier,
                    que vous pliez systématiquement les modèles du livre numérique, que vous déversez votre anxiété dans le groupe WhatsApp
                    et que vous faites preuve de patience — on ne peut organiser qu'un seul événement par an.`
        },
        {
          title: 'Quelques mois avant',
          content: `Les inscriptions sont ouvertes, sacré nom ! Inscrivez-vous maintenant — c'est moins cher
                    et vous aurez un meilleur créneau pour choisir vos ateliers.`
        },
        {
          title: '60 jours avant',
          content: `On est toujours dans le groupe WhatsApp de l'année dernière. Quelqu'un de plus avancé va commencer à demander pour les pins —
                    ne paniquez pas, mais ne vous relâchez pas non plus, ce n'est pas demain mais ce n'est pas si loin non plus.
                    C'est le moment de commencer à penser aux pins, aux cartes et à votre expo personnelle. Bon d'accord, paniquez un peu, surmontez-le et commencez à plier.`
        },
        {
          title: '1 jour avant',
          content: `Vous pouvez encore faire une nuit blanche et profiter de l'anxiété — si vous n'avez pas commencé avant,
                    vous pouvez arriver avec au moins 10 pins. J'en réclame un. Rien ne vaut un pin fait avec anxiété et adrénaline.
                    Préparez votre sac et préparez-vous pour le week-end que vous attendiez depuis si longtemps.`
        },
        {
          title: 'Jour 1',
          content: `<ol>
                      <li>Survivez à la nuit avant que l'événement commence (dormir est important, même si l'anxiété ne vous y aide pas).</li>
                      <li>Le jour J, rendez-vous sur les lieux — si vous préférez arriver quelques heures avant que tout commence,
                          vous trouverez sûrement un autre origamiste anxieux dans le coin. Vous pourrez déjeuner ensemble (en cas extrême, prendre le petit-déjeuner),
                          prendre un café et attendre 15h — on a appris la leçon : on ne monte pas l'expo en une demi-heure.</li>
                      <li>Récupérez votre kit et si vous avez plié quelque chose pour l'Expo, allez installer votre pièce ; Alejo Erazo vous attendra —
                          ne désespérez pas et soyez patient. Vérifiez calmement le contenu du kit
                          (faites mentalement la liste de ce qu'il vous faudra pour compléter la boîte le lendemain).</li>
                      <li>Prêt pour le canelazo et l'inauguration — à ce stade, vous avez probablement déjà plié quelque chose dans les couloirs
                          et rattrapé le temps perdu avec de vieux amis, ou trouvé votre bande pour le week-end.</li>
                      <li>Préparez-vous à ne pas dormir cette nuit non plus.</li>
                      <li>Dormez, s'il vous plaît ! … Rendez-vous au Jour 2.</li>
                    </ol>`
        },
        {
          title: 'Jour 2',
          content: `<ol start="0">
                      <li>Comme vous n'avez pas pu vous endormir tôt et avez finalement réussi à dormir vers 4h du matin, dépêchez-vous — vous allez être en retard.</li>
                      <li>Pendant votre trajet vers l'événement en transmi, taxi, Uber, vélo, téléportation ou en courant —
                          ouvrez la page et sélectionnez les ateliers. Ne paniquez pas si ça ne vous laisse pas entrer, ce n'est peut-être pas encore votre tour.
                          Et si c'est vous qui conduisez — garez-vous pour vous inscrire. N'utilisez pas votre téléphone au volant.</li>
                      <li>Consacrez toute la journée à plier, préparez-vous mentalement à la photo de groupe. Si vous étiez prévoyant, vous savez déjà où déjeuner.
                          Sinon, pas de panique : il y a des groupes qui ont déjà étudié le quartier — accrochez-vous à celui qui vous plaît le plus.</li>
                      <li>Surmontant la fatigue, assistez aux ateliers de l'après-midi, préparez-vous pour le Chocogami
                          et, pour l'amour du ciel — si vous vous êtes inscrit aux cartes, rendez-les, on vous cherche depuis hier.</li>
                      <li>UNIQUEMENT SI VOUS ÊTES MAJEUR, préparez-vous pour la Chiva (vous ne dormirez pas non plus cette nuit).</li>
                    </ol>`
        },
        {
          title: 'Jour 3',
          content: `<ol>
                      <li>Si vous avez réussi à vous lever, on se voit à l'événement.</li>
                      <li>Tout le reste : comme le Jour 2.</li>
                      <li>Remise des reconnaissances, clôture, chocolatada. Vous ressentirez une légère nostalgie qui durera jusqu'au prochain événement.</li>
                    </ol>`
        },
        {
          title: 'Jour 4',
          content: `Il y aura probablement des plans après l'événement — restez à l'affût sur le WhatsApp de l'événement.
                    L'enthousiasme nous pousse à nous retrouver pendant deux semaines d'affilée.
                    Si l'envie vous prend, on se verra là-bas.`
        }
      ],
    },
    activities: {
      title: 'Nos activités',
      subtitle: 'Découvrez tout ce que nous avons préparé pour vous',
      viewDetails: 'Voir les détails',
      prev: 'Précédent',
      next: 'Suivant',
      items: [
        {
          title: 'Publiez vos diagrammes : laissez votre empreinte 📝',
          imageUrl: 'images/457442674_10233497359799729_1347389003187592882_n.jpg',
          icon: 'fas fa-book',
          content: "Vous avez créé un modèle d'origami incroyable ? C'est votre chance de le voir publié ! Partagez vos diagrammes originaux dans notre livre « Páginas De Origami 2026 ». Vous toucherez des artistes d'origami du monde entier et votre création fera partie du livre officiel de l'événement. 🌍\nComment participer ? Simple : téléchargez les règles de soumission (<a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasES.docx'>espagnol</a> ou <a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasEN.docx'>anglais</a>), préparez vos diagrammes et envoyez-les avant le 20 mai 2026 à Camilo Torres : paginasdeorigami@gmail.com. Allez-y et partagez votre art !",
        },
        {
          title: 'Partagez votre talent : soyez animateur d\'atelier ! 🎨',
          imageUrl: 'images/61160257_10220581757310914_8555122383122333696_n-1.jpg',
          icon: 'fas fa-hands',
          content: 'Vous êtes passionné(e) par l\'enseignement de l\'origami ? C\'est votre moment ! Inscrivez-vous pour animer un atelier dans nos catégories (Basique, Intermédiaire, Avancé, Enfants) et partagez votre magie avec d\'autres plieurs. Lors de votre inscription, dites-nous quelles figures vous souhaitez enseigner — ou si vous préférez, envoyez-nous les détails plus tard ! Allez-y et inspirez les autres avec vos pliages. ✨',
        },
        {
          title: 'Brisez la glace avec des badges pliés 📌',
          imageUrl: 'images/289780022_2495040103971537_8568591026589863873_n-1.jpg',
          icon: 'fas fa-thumbtack',
          content: 'Vous êtes un peu timide pour commencer une conversation ? Nous avons la solution ! Rejoignez l\'échange de badges : pliez de petites figurines en origami qui peuvent être portées comme broches. Distribuez-les à qui vous voulez à l\'ouverture ou tout au long de l\'événement. C\'est le prétexte parfait pour créer des liens, vous faire des amis et repartir avec un souvenir unique ! 😉',
        },
        {
          title: 'Chocogami : le défi le plus gourmand ! 🍫',
          imageUrl: 'images/289282322_10230290849552152_1956165075611761127_n-1.jpg',
          icon: 'fas fa-cookie-bite',
          content: 'Préparez-vous pour un défi délicieux et créatif ! Dans Chocogami, vous déballez une célèbre tablette de chocolat colombienne, vous découvrez une photo secrète et... vous commencez à plier ! La règle d\'or : vous ne pouvez utiliser que l\'emballage du chocolat. Montrez votre ingéniosité, concourez pour gagner de jolis prix ou amusez-vous simplement à regarder les créations (et à manger du chocolat !). Vous osez ?',
        },
        {
          title: 'Échange de cartes ATC (Artist Trading Cards) : 🃏',
          imageUrl: 'images/AG-mariposas-1.png',
          icon: 'fas fa-exchange-alt',
          content: "Rendez vos ATC (Artist Trading Cards) inoubliables ! Concevez et assemblez des paquets de cartes en origami (16 cartes par paquet, en groupes de 2). À la fin, des paquets de 16 ou 32 cartes différentes sont échangés entre les participants, et chacun repart avec une collection unique ! Participez aussi au concours de la meilleure carte et laissez votre créativité briller. Téléchargez les <a style='color: #be7e62' href='https://origamibogota.com/descargas/ATC.docx'>règles de soumission</a> et commencez à plier des liens pleins d'art.",
        },
        {
          title: 'Montez à bord du bus festif ! 🚌🎶',
          imageUrl: 'images/f7f84ec16ebb55c406af906456176219-1.jpg',
          icon: 'fas fa-bus',
          content: 'Prêt(e) pour une nuit de fête colombienne pure ? La Chiva Rumbera est notre bus coloré et musical pour une sortie nocturne pleine de danse et de plaisir. C\'est une activité supplémentaire (réservée aux adultes !) parfaite pour se défouler après une journée de pliage. Ne la manquez pas si vous voulez vraiment vous amuser ! ヾ(-.-)ゞ *(Activité optionnelle, vérifiez les détails)*.',
        },
        {
          title: 'Rencontrez les invités ✨',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-users',
          content: 'Une occasion en or ! Nous aurons des cours spéciaux avec nos invités vedettes (international et national). Imaginez apprendre leurs secrets, entendre leurs histoires et plier un modèle spécial directement avec eux en grand groupe. Préparez-vous à une dose concentrée d\'inspiration et de connaissance de la part de ceux qui s\'y connaissent le mieux !',
        },
        {
          title: 'Ateliers pour tous : trouvez votre pli ! 🤓',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-chalkboard-teacher',
          content: 'Vous êtes nouveau dans le monde de l\'origami ou déjà un plieur expert ? Peu importe ! Nos ateliers sont divisés par niveau (Débutant, Intermédiaire, Expert) afin que vous puissiez profiter d\'apprendre des figures à votre rythme. Le meilleur : beaucoup d\'enseignants proposent des modèles qu\'ils ont eux-mêmes créés. Ce sont des opportunités uniques d\'apprendre des figures introuvables ailleurs !',
        },
        {
          title: 'Exposition : montrez votre art au monde ! 🤩',
          imageUrl: 'images/447852680_18270623236238474_4507690254501985740_n-1.jpg',
          icon: 'fas fa-eye',
          content: 'C\'est votre scène ! Apportez vos meilleures créations et exposez-les pour que tout le monde puisse les admirer. N\'oubliez pas de mettre une étiquette avec les informations clés (auteur, plieur, type de papier...). Vos modèles peuvent aussi remporter des prix ! Des votes auront lieu tout au long de l\'événement pour choisir la meilleure exposition (la créativité compte !). N\'oubliez pas de voter pour vos favoris et laissez votre œuvre inspirer les autres.',
        },
        {
          title: 'Origami Kids : du plaisir pour les petits ! 😊',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-child',
          content: 'L\'avenir de l\'origami est là ! Nous avons un coin spécial pour les enfants, avec des ateliers super amusants, des jeux et des figures conçus pour leurs petites mains créatives. Et si vous aimez enseigner et avez un don avec les enfants, devenez volontaire à Origami Kids ! C\'est une expérience enrichissante pleine de rires et de papier coloré.',
        },
        {
          title: 'Vente aux enchères silencieuse : trésors cachés ! 🤫',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-gavel',
          content: 'Vous cherchez cette perle d\'origami introuvable ? Participez à notre vente aux enchères silencieuse ! Vous y trouverez des livres, des papiers spéciaux, des modèles exclusifs donnés par des artistes et bien d\'autres surprises. Écrivez votre offre en secret, croisez les doigts et repartez avec quelque chose d\'unique ! Vous soutiendrez aussi la communauté de l\'origami.',
        },
        {
          title: 'Origami de couloir : la magie spontanée ! ✨',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-comments',
          content: 'Parfois les meilleures découvertes se font en dehors des salles de cours. L\'« Origami de couloir » est ce moment magique où vous partagez une astuce rapide, apprenez une figure d\'un nouvel ami ou discutez simplement de papiers et de plis dans un coin de l\'événement. Gardez les yeux ouverts et votre papier à portée de main — la connexion et l\'apprentissage se passent partout !',
        },
        {
          title: 'Explorez Bogotá : au-delà du papier ! 🌆',
          imageUrl: 'images/guatavita.jpeg',
          icon: 'fas fa-map-marked-alt',
          content: 'Vous souhaitez profiter de votre voyage pour explorer la capitale ? Bien sûr ! Nous vous donnerons des conseils et organiserons peut-être des visites optionnelles pour découvrir les charmes de Bogotá. Explorez la culture, goûtez la cuisine locale et repartez avec des souvenirs qui dépassent l\'origami. Une chance de vous dégourdir les jambes et de voir la ville entre deux pliages ! *(Consultez le programme pour plus de détails)*.',
        },
        {
          title: 'Tirages au sort et surprises ! 🎯🎁',
          imageUrl: 'images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png',
          icon: 'fas fa-gift',
          content: 'Restez vigilant et attentif tout au long de l\'événement ! Nous organiserons des tirages au sort et des surprises à différents moments. Vous pourriez gagner des livres d\'origami, des papiers spéciaux, des outils uniques et bien plus encore. La clé pour ne rien manquer : suivez les annonces et les activités ! Participez aux ateliers, assistez aux conférences et gardez les oreilles grandes ouvertes. La chance sourit à ceux qui sont présents et actifs ! Ne repartez pas sans un super prix. 🍀✨',
        },
      ],
    },
    footer: {
      contact: 'Contactez-nous',
      location: 'Lieu de l\'événement',
      register: 'S\'inscrire à l\'événement',
      registerText: 'Rejoignez le prochain Congrès Origami Bogotá',
      registerBtn: 'S\'inscrire maintenant',
      quickLinks: 'Liens rapides',
      rights: '© 2026 Congreso Origami Bogotá. Tous droits réservés.',
      home: 'Accueil',
      inscriptions: 'Inscriptions',
      workshops: 'Ateliers',
    },
    faq: {
      title: 'Questions fréquemment posées',
      subtitle: 'Tout ce que vous devez savoir sur l\'événement Origami Bogotá',
      contactText: 'Vous ne trouvez pas ce que vous cherchez ?',
      contactLink: 'Contactez-nous via WhatsApp',
      items: [
        { id: 'faq1', icon: 'fas fa-ticket-alt', question: 'Qu\'est-ce qui est inclus dans l\'inscription ?', answer: 'L\'inscription comprend l\'entrée à l\'événement, les ateliers, la boîte de l\'événement avec les matériaux, les rafraîchissements, l\'espace d\'exposition, le cocktail de bienvenue et le chocolat chaud d\'adieu. Les mineurs peuvent participer avec un accompagnateur.', column: 1 },
        { id: 'faq2', icon: 'fas fa-calendar-check', question: 'Quelle est la différence entre une inscription complète et une inscription à la journée ?', answer: 'L\'inscription complète vous permet d\'assister à toutes les activités. Une inscription à la journée est valable pour le samedi ou le dimanche uniquement. Tous les participants reçoivent le kit de l\'événement.', column: 1 },
        { id: 'faq3', icon: 'fas fa-exchange-alt', question: 'Combien de groupes de cartes ATC y a-t-il ?', answer: 'Cela dépend du nombre de participants inscrits ; parfois il y a 2 groupes et parfois un seul. L\'information sera confirmée aux participants inscrits une semaine avant l\'événement.', column: 1 },
        { id: 'faq4', icon: 'fas fa-chalkboard-teacher', question: 'Comment choisir mes ateliers ?', answer: 'Le matin de chaque journée, en utilisant votre numéro d\'inscription, vous pouvez sélectionner vos ateliers sur le site à partir de 8h. Les places sont limitées, préparez donc plusieurs options au cas où votre premier choix serait complet.', column: 1 },
        { id: 'faq5', icon: 'fas fa-sort-numeric-down', question: 'Comment les numéros d\'inscription sont-ils attribués ?', answer: 'Les numéros sont attribués par ordre d\'inscription, c\'est-à-dire par date de paiement. Plus vous vous inscrivez tôt, plus votre numéro sera petit.', column: 1 },
        { id: 'faq6', icon: 'fas fa-user-friends', question: 'À quoi ai-je droit en tant qu\'accompagnateur ?', answer: 'Vous pouvez visiter les espaces communs de l\'événement, mais vous ne pouvez pas assister aux ateliers ni recevoir les matériaux ou les rafraîchissements.', column: 2 },
        { id: 'faq7', icon: 'fas fa-child', question: 'Tous les mineurs doivent-ils être accompagnés ?', answer: 'L\'événement n\'exige pas un accompagnateur pour tous les mineurs, mais les organisateurs ne pourront pas être tenus responsables. C\'est à l\'accompagnateur de décider de rester ou non.', column: 2 },
        { id: 'faq8', icon: 'fas fa-envelope', question: 'Que faire si je n\'ai pas reçu l\'e-mail avec mon numéro ?', answer: 'Nous aurons une liste imprimée avec les numéros. Nous vous recommandons d\'ajouter inscripciones&#64;origamibogota.com à vos contacts pour recevoir toutes les informations.', column: 2 },
        { id: 'faq9', icon: 'fas fa-clock', question: 'Quels sont les horaires de l\'événement ?', answer: 'Consultez le programme dans la section « À propos de l\'événement » et cliquez sur le bouton « Programme ».', column: 2 },
        { id: 'faq10', icon: 'fas fa-bus', question: 'Qui peut participer à la Chiva ?', answer: 'Les participants adultes à l\'événement, les partenaires ou amis des participants (tous majeurs) qui paient les frais de l\'activité supplémentaire (comprend une boisson et de l\'aguardiente).', column: 2 },
        { id: 'faq11', icon: 'fas fa-thumbtack', question: 'Combien de badges/broches dois-je fabriquer ?', answer: 'C\'est une activité libre ; vous pouvez en fabriquer autant que vous souhaitez offrir ou échanger. L\'événement fabrique 70 badges pour tous les participants au cocktail de bienvenue.', column: 3 },
        { id: 'faq12', icon: 'fas fa-box-open', question: 'Quand puis-je récupérer mon kit ?', answer: 'Le vendredi de 17h à 18h ou après le cocktail ; le samedi ou dimanche de 8h à 9h.', column: 3 },
        { id: 'faq13', icon: 'fas fa-calendar-times', question: 'Que se passe-t-il si je ne peux pas assister à l\'événement ?', answer: 'Vous pouvez transférer votre inscription à une autre personne ou récupérer le kit de l\'événement. Les inscriptions ne sont ni remboursables ni échangeables pour des événements futurs, quelles que soient les circonstances.', column: 3 },
        { id: 'faq14', icon: 'fas fa-map-marker-alt', question: 'Où dois-je aller à mon arrivée ?', answer: 'Rendez-vous au bureau de l\'événement pour récupérer votre badge et votre kit. Le cocktail de bienvenue a lieu à l\'auditorium au Cra 8 #56-50.', column: 3 },
        { id: 'faq15', icon: 'fas fa-id-card', question: 'Comment organiser les cartes ?', answer: 'Il y a généralement 2 groupes de cartes ; des ensembles de 16 cartes doivent être préparés pour chaque groupe.', column: 3 },
      ],
    },
    banner3: {
      title: 'Partagez votre passion ! Soyez animateur d\'atelier à notre événement',
      description: 'Nous recherchons des esprits créatifs comme le vôtre pour inspirer et enseigner lors de notre prochain événement. Si vous avez un modèle d\'origami à partager et à enseigner, nous voulons entendre votre proposition !',
      cta: 'Proposer un atelier maintenant',
    },
    resources: {
      title: 'Ressources de l\'événement',
      subtitle: 'Téléchargez tous les documents avec les informations pertinentes pour l\'événement',
      downloadBtn: 'Télécharger',
      items: [
        { name: 'Guide du participant', url: 'https://docs.google.com/document/d/1QUvn97FZU8NHgg4Rtj-nqs-ur0wTqFK2gFL5nJnh3qY/edit?tab=t.0' },
        { name: 'Programme', url: 'https://origamibogota.com/descargas/cronograma.pdf' },
        { name: 'Appel à candidatures ATC', url: 'https://origamibogota.com/descargas/ATC.docx' },
        { name: 'Appel à diagrammes en espagnol', url: 'https://origamibogota.com/descargas/basesdiagramasES.docx' },
        { name: 'Appel à diagrammes en anglais', url: 'https://origamibogota.com/descargas/basesdiagramasEN.docx' },
      ],
    },
    sponsors: {
      title: 'Nos sponsors',
    },
    workshopsInscriptions: {
      title: 'S\'inscrire aux ateliers',
      subtitle: 'Convention Origami Bogotá 2026',
      description1: 'Réservez votre place dans les ateliers spécialisés qui auront lieu pendant la convention. Apprenez directement auprès de maîtres d\'origami renommés.',
      description2: 'Consultez les menus d\'ateliers disponibles pour chaque jour et assurez votre participation aux activités qui vous intéressent.',
      registerBtn: 'S\'inscrire aux ateliers',
      bookletBtn: 'Voir le livret',
      menuBtn: 'Menu PDF',
      countdownTitle: 'Inscriptions aux ateliers',
      countdownSubtitle: 'Bientôt disponible',
      availableIn: 'Disponible dans',
      days: 'jours',
      hours: 'heures',
      minutes: 'minutes',
    },
    inscriptions: {
      heroTitle: 'Les inscriptions sont ouvertes !',
      howTitle: 'Comment m\'inscrire ?',
      howDescription: 'Cette fois, l\'inscription doit être effectuée en suivant ces deux étapes.',
      step1Title: 'Étape I',
      step1Description: 'Effectuez votre paiement d\'inscription en choisissant l\'un de nos modes de paiement. Profitez du tarif Early Bird.',
      step1Btn: 'Modes de paiement',
      step2Title: 'Étape II',
      step2Description: 'Une fois que vous avez choisi et complété votre paiement, inscrivez-vous dans le formulaire pour accéder aux ateliers.',
      step2Btn: 'Formulaire d\'inscription',
      pageTitle: 'ÉTAPE I',
      pageSubtitle: 'Effectuez votre paiement d\'inscription en choisissant l\'un de nos modes de paiement. Profitez du tarif Early Bird.',
      buyBtn: 'ACHETER ICI',
      dailyTitle: 'Options à la journée',
      selectBtn: 'Sélectionner',
      earlyBirdName: 'Early Bird',
      earlyBirdBadge: 'Offre spéciale',
      earlyBirdDeadline: 'Jusqu\'au 15 janvier 2026',
      phase2Deadline: 'Jusqu\'au 14 juin 2026',
      includes: ['Kit de matériaux', 'Collations (sans déjeuner)', 'Accès aux ateliers'],
      saturdayDay: 'Samedi',
      sundayDay: 'Dimanche',
      saturdayDesc: 'Inscription pour participer à l\'événement le vendredi et le samedi, avec accès aux ateliers, conférences et concours. Comprend les matériaux et les collations (sans déjeuner).',
      sundayDesc: 'Inscription pour participer à l\'événement le vendredi et le dimanche, avec accès aux ateliers, conférences et concours. Comprend les matériaux et les collations (sans déjeuner).',
      paymentInfoTitle: 'Informations de paiement',
      paymentInfoHtml: '<p>Vous serez redirigé(e) vers le site de paiement de notre sponsor origamistica.com.</p><p>Une fois le paiement effectué, <strong>vous devez revenir sur cette page</strong> pour compléter le formulaire d\'inscription pour chaque participant.</p>',
      continueBtn: 'Continuer vers le paiement',
      cancelBtn: 'Annuler',
      payMethodsTitle: 'Modes de paiement',
      payMethodsDesc: 'Vous pouvez utiliser l\'une de ces méthodes. N\'oubliez pas de compléter le formulaire d\'inscription une fois le paiement effectué afin de pouvoir choisir vos ateliers.',
      payMethodsFooter: 'Important ! Une fois le paiement effectué, n\'oubliez pas de compléter le formulaire d\'inscription pour réserver votre place et sélectionner les ateliers auxquels vous souhaitez assister. La dernière étape pour faire partie de cette expérience incroyable !',
      mobileDesc: '+57 315 2459839',
      bankTitle: 'Virement bancaire',
      bankDesc: 'Demandez les coordonnées bancaires via WhatsApp.',
      cardTitle: 'Cartes',
      cardDesc: 'Avec votre carte de crédit ou de débit dans la boutique en ligne.',
      cardLink: 'Cliquez ici',
      cashTitle: 'Espèces',
      cashDesc: 'Contactez-nous via WhatsApp',
      step2Header: 'ÉTAPE II',
      step2Subtitle: 'Une fois le paiement effectué par l\'un des modes, vous devez formaliser votre inscription en complétant ce formulaire.',
      stepPersonal: 'Personnel',
      stepContact: 'Contact',
      stepPayment: 'Paiement',
      stepParticip: 'Particip.',
      stepOptions: 'Options',
      stepOf: 'de',
      prevBtn: 'Précédent',
      nextBtn: 'Suivant',
      submitBtn: 'S\'inscrire',
      sendingBtn: 'Envoi en cours...',
      successTitle: 'Inscription réussie !',
      successMsg: 'Nous avons envoyé un e-mail de confirmation à',
      successMsg2: 'avec vos détails d\'inscription.',
      checkEmail: 'Veuillez vérifier votre boîte de réception et votre dossier de spam.',
      newRegistration: 'Nouvelle inscription',
      personalTitle: 'Informations personnelles',
      nameLabel: 'Prénom',
      lastnameLabel: 'Nom de famille',
      ageLabel: 'Âge',
      idnameLabel: 'Nom pour le badge',
      contactTitle: 'Informations de contact',
      countryLabel: 'Pays',
      cityLabel: 'Ville',
      emailLabel: 'Adresse e-mail',
      emailHint: 'Assurez-vous de fournir une adresse e-mail valide, car vous recevrez des informations importantes sur l\'événement.',
      phoneLabel: 'Téléphone',
      paymentTitle: 'Informations de paiement',
      payTypeLabel: 'Type de paiement / d\'inscription',
      selectOption: 'Sélectionner',
      cashNote: '*Vous devez confirmer le mode de paiement en espèces en nous contactant avant de finaliser votre inscription.',
      payDateLabel: 'Date de paiement',
      receiptLabel: 'Numéro de reçu',
      receiptHint: 'Décrivez ici le type de bourse ; si sponsorisé, indiquez l\'entreprise ou l\'institution.',
      participTitle: 'Participation à l\'événement',
      participQuestion: 'Comment allez-vous participer ?',
      allDays: 'Je participerai tous les jours',
      satOnly: 'Samedi uniquement',
      sunOnly: 'Dimanche uniquement',
      companionLabel: 'Nom de l\'accompagnateur',
      companionHint: '*Saisissez ces informations si le participant est mineur et a besoin d\'un accompagnateur, ou si le participant est un adulte nécessitant une aide supplémentaire.',
      optionsTitle: 'Options de participation',
      howHeardLabel: 'Comment avez-vous entendu parler de l\'événement ?',
      socialMedia: 'Réseaux sociaux',
      press: 'Presse',
      tv: 'Télévision',
      referrals: 'Recommandations',
      other: 'Autre',
      specifyPlaceholder: 'Veuillez préciser',
      printCertLabel: 'Je souhaite recevoir un certificat imprimé',
      origamiGroupLabel: 'J\'appartiens à un groupe d\'origami',
      origamiGroupPlaceholder: 'Précisez le nom du groupe',
      cardsLabel: 'Je participerai à l\'échange de cartes',
      cardsHint: 'Vous devez préparer 1 ensemble de 16 cartes par groupe auquel vous souhaitez participer.',
      cardsPlaceholder: 'Nombre de groupes',
      workshopsLabel: 'Je souhaite animer des ateliers',
      workshopsHint: 'Une fois inscrit(e), vous pouvez ajouter vos informations d\'atelier à',
      chivaLabel: 'Je participerai à la Chiva Rumbera',
      chivaAdultsOnly: '(Adultes uniquement)',
      chivaCompanionsQuestion: 'Viendrez-vous avec des accompagnateurs ?',
      chivaNo: 'Non, j\'y vais seul(e)',
      chivaYes: 'Oui, j\'amènerai des accompagnateurs',
      companionsNumLabel: 'Nombre d\'accompagnateurs',
      companionsNumHint: 'Veuillez indiquer combien de personnes vous accompagneront (minimum 2, maximum 9)',
      companionsNumPlaceholder: 'Entrez le nombre d\'accompagnateurs',
      note1: '*N\'oubliez pas qu\'il est important de formaliser votre inscription pour obtenir votre numéro de participant et recevoir les notifications.',
      note2: '*N\'oubliez pas de soumettre ce formulaire pour chaque participant à l\'événement que vous avez confirmé dans votre paiement.',
      note3: '*Les informations fournies dans ce formulaire sont utilisées exclusivement par origamibogota.com pour collecter les données de présence et des participants à l\'événement.',
      note4: '*N\'oubliez pas de saisir une adresse e-mail réelle et valide, d\'ajouter inscripciones@origamibogota.com à vos contacts et de vérifier votre boîte de réception (ou le dossier spam), car nous vous enverrons des notifications sur l\'événement à cette adresse.',
      valName: 'Veuillez saisir votre prénom',
      valLastname: 'Veuillez saisir votre nom de famille',
      valAge: 'Veuillez saisir votre âge',
      valIdname: 'Veuillez saisir le nom pour votre badge',
      valCountry: 'Veuillez sélectionner votre pays',
      valCity: 'Veuillez saisir votre ville',
      valEmail: 'Veuillez saisir votre adresse e-mail',
      valEmailInvalid: 'L\'adresse e-mail doit être une adresse valide',
      valPhone: 'Veuillez saisir votre numéro de téléphone',
      valPhoneNumeric: 'Le numéro de téléphone ne doit contenir que des chiffres',
      valPayMethod: 'Veuillez sélectionner le type de paiement',
      valPayDate: 'Veuillez saisir la date de paiement',
      valReceipt: 'Veuillez saisir le numéro de reçu',
      valDays: 'Veuillez préciser le(s) jour(s) auxquels vous assisterez',
      valHowHeard: 'Veuillez indiquer comment vous avez entendu parler de l\'événement',
      valHowHeardSpecify: 'Veuillez préciser comment vous avez entendu parler de l\'événement',
      valOrigamiGroup: 'Veuillez préciser le groupe d\'origami auquel vous appartenez',
      valCardGroup: 'Veuillez préciser le nombre de groupes pour l\'échange de cartes',
      valCardGroupRange: 'Le nombre de groupes pour l\'échange de cartes doit être 1 ou 2',
      valChivaAccompanied: 'Veuillez indiquer si vous irez seul(e) ou avec des accompagnateurs à la Chiva Rumbera',
      valChivaCompanions: 'Veuillez indiquer combien d\'accompagnateurs vous amènerez à la Chiva Rumbera',
      valChivaMin: 'Le nombre d\'accompagnateurs doit être d\'au moins 2',
      valChivaMax: 'Le nombre maximum d\'accompagnateurs autorisé est 3',
      chivaErrNum: 'Veuillez saisir un nombre valide',
      chivaErrMin: 'Il doit y avoir au moins 2 accompagnateurs',
      chivaErrMax: 'Le maximum autorisé est 3 accompagnateurs',
      alertTitle: 'Attention',
      submitError: 'Une erreur s\'est produite lors du traitement de l\'inscription. Veuillez réessayer.',
      submitErrorTitle: 'Erreur',
    },
    seo: {
      home: { title: 'Origami Bogotá 2026 | Convention d\'Origami en Colombie', description: 'Origami Bogotá 2026 : la principale convention d\'origami de Colombie. Du 12 au 14 juin au Liceo Francés Louis Pasteur, Bogotá.' },
      inscripciones: { title: 'Inscriptions | Origami Bogotá 2026', description: 'Inscrivez-vous à la Convention Origami Bogotá 2026. Choisissez votre formule de participation, ateliers et modes de paiement.' },
      talleres: { title: 'Ateliers | Origami Bogotá 2026', description: 'Découvrez les ateliers d\'origami de la Convention Origami Bogotá 2026. Apprenez avec des maîtres internationaux et nationaux.' },
      recursos: { title: 'Ressources & FAQ | Origami Bogotá 2026', description: 'Questions fréquentes et ressources utiles pour les participants à la Convention Origami Bogotá 2026.' },
      amigosPlegadores: { title: 'Amis Plieurs | Origami Bogotá 2026', description: 'Rencontrez les amis plieurs de la Convention Origami Bogotá 2026 : maîtres et passionnés d\'origami du monde entier.' },
      booklet: { title: 'Booklet & Programme | Origami Bogotá 2026', description: 'Consultez l\'itinéraire et le programme complet de la Convention Origami Bogotá 2026.' },
    },
  },
};
