import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Post } from '@/types';
import { usePosts } from '@/hooks/usePosts';

export const postsData: Post[] = [
  {
    id: '1',
    titulo: 'Mi primer día de trabajo',
    fecha_publicacion: '2020-02-01',
    url: 'https://lasletrasdemaju.blogspot.com/2020/02/mi-primer-dia-de-trabajo.html',
    extracto: 'El despertador sonó a las 6:00 a.m. Me dolía la cabeza, estaba mareada y era mi primer día de trabajo.',
    contenido: `El despertador sonó a las 6:00 a.m. Me dolía la cabeza, estaba mareada y era mi primer día de trabajo. Escuchaba a mi mamá pelear en el fondo. La luz me molestaba horrible y no recordaba mucho. Me levanté, no podía vomitar aunque quería, tenía mucho sueño y un tufo terrible.

Lo único que pude decir en ese momento fue ¡Pollo, hijue...! Me bañé, salí corriendo y llegué a mi gran primer día. Había comprado una soda y la tenía escondida en mi bolso. Saludé, me senté, miré la pared y los cuadros se movían. Tenía síndrome post borrachera. Dentro de mí dije: "Que hoy no me pongan a escribir". En eso entró mi jefe y me dijo: "Empezaron las inscripciones, puedes redactar una nota, por favor". ¡Quería morirme!

Aún peor fue la entrada del encargado de talento humano. Yo solo podía pensar en que no se sintiera el olor a alcohol. Me presentó con la gerente. No sé qué era peor: escribir una nota o tener que saludar a un directivo en esas condiciones.

El día anterior, un amigo cumplía años. Después de un helado, terminamos sentados en un local donde había promoción de 2x1 en peceras. Era la primera vez que probaba una. Fue supersuave, se sentía rica, era temprano, quizás las 7:30 p.m. Sabía que tenía una responsabilidad al otro día, así que no pensaba quedarme mucho.

Daniel estaba atendiendo ese día. Se acercó a mi mesa y yo, entre chiste y chanza, le dije: "Oiga Pollo, regáleme una pecera, no sea tacaño". Obviamente lo conocía y sabía que no lo iba a hacer. Solo sonrió y se entró de nuevo a la barra.

Luego de un rato volvió y me dijo: "Si se toma una pecera sola no le cobro nada". Y ahí estaba yo, jugando con el diablo, respondiendo: "pues tráigala". Pensé que una pecera de esas era inofensiva. "Me la tomo y me voy sin pagar, es un buen trato". Me da tanta risa recordar porque no recuerdo casi nada de esa noche.

Sentada en el escritorio, hice mi mejor esfuerzo por redactar lo que me pidieron. Talento humano me llamó de nuevo cerca de las 10:30 a.m. Iba asustada, pensé que me echaban el primer día. Por suerte me dijo: "Te doy toda la tarde libre, haz tus vueltas personales y mañana empiezas ya con toda". En ese momento, ¡lo amé!

Lo primero que hice al salir fue llegar donde una amiga que había estado conmigo toda la noche. Me contó que vomité varias veces, que me acostaron en un mueble casi a las 8:30 p.m., que decía "Yo no soy así, me van a matar" y que le tocó poner en modo avión mi celular porque quería grabar historias borracha. Entre ella y otra amiga me dieron sales de frutas con limón. A Pollo le tocó pagar las peceras y limpiar el baño que quedó desastroso.

Aprendí ese día que un "plan tranquilo" nunca va a ser un "plan tranquilo" y menos una buena idea un martes cuando al siguiente día es tu primer día de trabajo.

A Pollo, cuando lo veo, me río y siempre me dice: "Una o miedo". Obviamente ya no le sigo el juego. La verdad es que mis amigos siguen contando cosas de ese día y yo sigo burlándome.`,
  },
  {
    id: '2',
    titulo: 'Y esta vez es muy es muy personal...',
    fecha_publicacion: '2025-03-01',
    url: 'https://lasletrasdemaju.blogspot.com/2025/03/y-esta-vez-es-muy-es-muy-personal.html',
    extracto: 'Voy a mil siempre tengo energía para todos y para todo, intento hacer mucho a la vez y hacer todo bien...',
    contenido: `Voy a mil siempre tengo energía para todos y para todo, intento hacer mucho a la vez y hacer todo bien, de pequeña no pude hacer muchas cosas en su mayoría por limitaciones económicas, siempre busqué la forma como esa vez que no pude ser porrista, pero veía entrenar de lejos y aprendía todo, bueno esa soy yo siempre, entonces ahora que estoy grande quiero comerme el mundo y por eso me aplaudo y me celebro todo, es un pequeño gesto de amor propio con la niña que un día fui, aparte me autonombre superhéroe así que he sido la mía y la de los míos, cosa supremamente agotadora y lo digo con el mayor amor del mundo.

Pero un día, en medio de ese corre-corre y en el estar para todos y todo, me vi atrapada. Como si estuviera en el ojo de un torbellino, viendo el caos girar a mi alrededor sin poder reaccionar, mi bonita esencia de "estar" fue abusada. Permití más de lo que debía, ignoré mis propios límites y me exigí absurdamente. Dejé que todo siguiera creciendo hasta que, inevitablemente, me arrastró.

Como en intensamente, empecé a ver caer mis islas. Al principio no me importó. Estaba demasiado ocupada en todo y en nada al mismo tiempo. Normalicé lo que nunca debí permitir, sobre todo de personas que quiero o de otras que al día de hoy quería. Hasta que mi isla principal colapsó. Esa isla era yo.

Me arreglaba, me miraba al espejo y, aunque me veía preciosa, no me sentía ahí. Se volvió doloroso porque no me reconocía. Ahora le llaman "perder el brillo". Yo solo sé que me sentía vacía. Busqué entre las cosas que solían hacerme feliz y tampoco me encontré. Fue raro porque, sin querer hacerlo, recibí mensajes como: —Volviste a bailar. ¿Estás bien? Siempre vuelves cuando algo pasa… No tuve palabras.

Llevé los ojos tristes y brillosos por meses… Un día le dije a alguien: Cuido de todos, pero siento que nadie cuida de mí. Me respondió —"Eso suena muy triste". Y fue ahí cuando empecé a cuestionarme mis yo puedo sola y a preguntarme: ¿por qué? ¡No quiero querer sola!

Estaba agotada. Harta de todo y de todos. Hasta que colapsé. De repente, estaba llorando mares... La ansiedad me tomó, me hiperventilaba, no podía respirar. Sentía unas ganas absurdas de gritar y llorar sin control. Escuchó de todos: Eres fuerte. Oigan, lo sé. Lo juro. Pero no era cuestión de ser fuerte. Yo quería romperme. Quería ser débil. Necesitaba sentir y dejar salir todo eso.

Mi cuerpo también lo sintió. Se brotó mi cara. Bajé de peso. Quería dormir. Quizás hubo algo más… creo que parte de la ansiedad se convirtió en depresión. Lo supe, porque incluso conocidos o extraños me decían que no parecía yo. Entonces entendí que, aunque no me conocieran tanto, la gente veía en mí algo especial que yo misma sabía que no estaba, había perdido. Y yo, más que nadie, lo extrañaba.

Los que me conocen saben que odio las zonas de confort. Siempre quiero más. Así que terminé mis responsabilidades, abrí mi maleta y decidí huir. Una mala costumbre mía: cuando hay caos, quiero correr. Me fui. A pesar de haber prometido no ir a la F este año, sentía que necesitaba un lugar donde recibir un poco de lo que doy para todos: amor.

El acto más egoísta para todos ustedes, los que se limitaron a juzgarme sin saber que necesitaba distancia, un tiempo para mí. Quería estar lejos. Dormir más de cuatro horas seguidas sin despertar abrumada. Comer con ganas, sin que la ansiedad me cerrara el apetito. Tener un celular silencio, sin notificaciones de tareas interminables. Salir a caminar sin prisa, disfrutar de la gente, del momento. Sentarme sin hacer nada, solo ver el mundo pasar y escuchar la paz que trae apagarlo todo.

En medio de ese viaje, algunos supieron que no era casualidad, otros solo hicieron parte de algo sin saber que me daban una recarga.

Un día, en medio del viaje, me vi en el espejo y tomé una foto. Es mi foto favorita. Quería volver a mí. Y lo hice. Tenía una sonrisa genuina y mis preciosos ojos achinados brillaban en su mejor momento. Me olvidé de todos ustedes. Me volví a escuchar a mí. Conecté con algo que no sé explicar, pero que me da mil años de vida. Me prometí que este año sería diferente.

Así que déjenme, reír, bailar y gozar cada instante. Porque disfrutar hace unos meses, aunque ustedes me veían bien, la estaba pasando muy mal. Y muchos ni siquiera lo notaron. Pero sí, la paso mal, pero nunca quiero que me vean así.

Pero Maye es luz. Y aunque por un momento no fue ni sombra, se conoce lo suficientemente bien como para decirse a sí misma: Ya nos ha pasado antes. Algo dentro está muriendo porque estamos aprendiendo algo que aún no entendemos. Y como antes, volveremos con más fuerza.

Toqué fondo conmigo misma. Fui desleal a mi propia regla de oro: ser fiel a mí y a mis principios. Pero incluso en mi peor momento, entendí algo poderoso: en los ojos de quienes realmente me aprecian, soy un regalo. Un regalo que protege, da amor, cuida y deja calorcito en el corazón.

Me necesité, y agradezco haberme escuchado. La ansiedad aún está, a veces va y viene, pero es un monstruito con que debo y aprendí a lidiar.

Nunca me ha importado tanto el que dirán, por eso en mis redes no oculto mi esencia. Aunque la mayoría del tiempo les muestro lo bonito, este es un recordatorio de que la vida es dura para todos, y que darse mala vida es simplemente desgastante. Sean felices y valórense, porque aunque vivimos acompañados, al final el viaje es con uno mismo.`,
  },
  {
    id: '3',
    titulo: 'Gracias Kary por ese espejo',
    fecha_publicacion: '2025-04-01',
    url: 'https://lasletrasdemaju.blogspot.com/2025/04/gracias-kary-por-ese-espejo.html',
    extracto: 'Hoy recordé que hace unos meses estaba hablando con mi amiga Karina, antes de que viajara a visitarnos a Colombia.',
    contenido: `Hoy recordé que hace unos meses estaba hablando con mi amiga Karina, antes de que viajara a visitarnos a Colombia. Nos dimos ese tiempo que a veces parece escaso, pero que cuando llega se vuelve eterno: hablamos de todo, de lo cotidiano, de lo que sentimos, de lo que nos cuesta, de lo que soñamos en voz bajita o de lo que ya gritamos sin miedo.

En medio de esa charla, su esposo entró en la conversación con un comentario sobre algo importante que estábamos hablando, algo muy mío (¡Sebastián, por favor, deja el chisme! Jajaja). La verdad, no recuerdo con exactitud qué fue lo que dijo. Pero lo que sí se me quedó muy grabado fue la respuesta que Karina le dio, como quien lanza una flecha sin pensarlo mucho, pero con una puntería increíble:

"A Maye no le gustan las zonas de confort." Plof. Eso hizo en mi cabeza.

Nunca lo había pensado. O bueno, tal vez sí, pero no lo había visto tan claro. Como cuando alguien te limpia un espejo y de repente ves algo que siempre estuvo ahí, pero tú no lo habías notado. Me quedé con esa frase dándome vueltas varios días.

Y me hizo pensar. Porque sí, creo que es verdad. No me gustan las zonas de confort, aunque a veces me queje, aunque a veces me dé miedo, aunque muchas veces preferiría no tener que estar saliendo, enfrentando, cambiando. Pero lo hago. Lo hago casi como una necesidad, como si quedarme quieta me apagara de a poquitos.

Y lo más curioso de todo esto es que ese momento me llevó a desear algo que me pasa con frecuencia: quisiera verme con los ojos de los demás. Porque a veces no reconozco en mí muchas de las cosas que podrían hacerme distinta. Me enfoco tanto en lo que me falta, en lo que aún no sé, en lo que no logro, que se me olvida mirar con más compasión —y con más asombro también— todo lo que sí soy, todo lo que ya hago, todo lo que me empuja hacia adelante.

Y no lo digo desde el ego, lo digo desde ese lugarcito donde uno quiere entenderse mejor, aceptarse con más paciencia y quererse con más verdad. Tal vez escribir esto también sea parte de no quedarme en la zona cómoda. Tal vez compartir lo que pienso —aunque me dé pena, aunque dude, aunque no tenga todas las respuestas— es mi forma de honrar esa parte de mí que insiste, que no se conforma, que busca, que cambia.

Gracias, Kary, por esa frase.

Gracias por ese espejo.`,
  },
  {
    id: '4',
    titulo: 'Caos, el arte de arder sin quemarme',
    fecha_publicacion: '2025-06-01',
    url: 'https://lasletrasdemaju.blogspot.com/2025/06/caos-el-arte-de-arder-sin-quemarme.html',
    extracto: 'Me gusta el caos, lo dijo esa Maye, que después de un día duro, estresante, por fin se sentó en calma...',
    contenido: `Me gusta el caos, lo dijo esa Maye, que después de un día duro, estresante, de esos que te sacuden por dentro, por fin se sentó en calma, respiró profundo y se sintió orgullosa de haber sacado adelante una jornada que la superaba.

Esa que gritó, se puso las manos en la cabeza mil veces y pensó: ¿Ahora qué hago? ¿Cómo lo soluciono? Esa que, cuando todo se salió de control, peleó con todos… y consigo misma.

Y sin pausa, con mucha prisa, corrió, se agitó, llamó, alzó, hizo, envió, pidió, ordenó… hasta que, en un momento, todo se calmó. Y pensé: ¿Ya? Entonces miré alrededor, y sí: ya todo había pasado.

En esos días, al llegar a casa, sin importar la hora, me siento en la cama, rebobino y pienso en cómo se salió todo de control… cómo logré manejarlo. Y entonces, me siento como la persona más increíble del mundo.

Es ahí donde abrazo el caos, por retarme, por sacarme de esos días aburridos donde nada pasa y todo se repite en la tranquilidad de la costumbre diaria.

El caos, a veces, tiene fecha en el calendario, y sabes que viene con todo. Pero hay días en que uno se levanta como si fuera un día cualquiera y… ¡plow! Estalla. Esos son los peores… pero, ilógicamente, son mis favoritos.

Porque en medio del desastre, del corre-corre, del "no sé cómo, pero lo hago", hay una parte de mí que se enciende, que se agiganta, que encuentra sentido.

Y justo ahí, cuando el día termina y me abrazo —despeinada, agotada y con el corazón complacido—, me acuerdo de una frase que se me quedó tatuada desde que vi Alicia a través del espejo, una frase del grupo de soñadores imposibles del que considero que hago parte y que dice:

"A veces he creído hasta en seis cosas imposibles antes del desayuno." Porque esa soy yo cuando despierto, aún soñando con los ojos abiertos. Y lo más increíble es que, sin darme cuenta, a veces incluso he hecho realidad esas seis cosas imposibles… antes del almuerzo.

Espero que el caos nos encuentre siempre ardiendo, y no consumidos.`,
  },
  {
    id: '5',
    titulo: 'La editorial soy yo, y el libro está abierto',
    fecha_publicacion: '2025-06-10',
    url: 'https://lasletrasdemaju.blogspot.com/2025/06/la-editorial-soy-yo-y-el-libro-esta.html',
    extracto: 'Hola, soy Maye… y sí, soy un libro abierto. Siempre lo he sido y, sinceramente, no tengo planes de cerrarme.',
    contenido: `Hola, soy Maye… y sí, soy un libro abierto. Siempre lo he sido y, sinceramente, no tengo planes de cerrarme.

Mis redes sociales son ese libro que tengo expuesto al mundo. Cada historia, cada video, cada publicación, es una página escrita desde lo que soy: emociones sinceras, momentos espontáneos, y pensamientos que a veces no caben en un pie de foto. Algunas páginas hacen reír, otras incomodan, unas inspiran y otras, simplemente, son mías.

Sé que compartir tanto puede ser polémico. Hay quienes se hacen fans de mi libro: disfrutan cada hoja, se ríen, se identifican, me comparten con otros… incluso viven partes de su día a través de mis publicaciones. Y claro, también están quienes me leen con juicio, con crítica, con ganas de tachar lo que no les gusta. Pero así son los libros abiertos: no se controlan las interpretaciones.

A veces, sí, me cuestiono. Hay días en los que mi propia cabeza me dice: "Mejor cierra el libro. Guarda esas páginas solo para ti. Qué necesidad de exponer tanto". Y por un segundo, lo pienso… Pero no puedo, esto me gusta. Que esto soy yo.

He escuchado muchas veces:

"Deja de compartir tanto."

Pero también me han dicho:

"Me fascina cuando publicas."

"Me hiciste el día."

"Invítame, quiero ser parte de una de tus páginas."

Y eso es lindo, por alguna razón que no entiendo sé que a veces sin querer inspiro, y hay gente que sigue mis pasos.

Pero este libro no es solo mío. Hay páginas con invitados: unos tranquilos, otros intensos, unos que suman calma, otros que estallan en color, esos llenan de vida cada capítulo, siempre serán mis favoritos.

Aunque parezca que lo cuento todo, tengo mis reservas. Publico todo el día, sí… pero tengo capítulos enteros que nadie conoce. Capítulos que no están en redes, historias que no han salido del borrador, y emociones que solo viven en silencio. Y eso no me hace menos real, al contrario.

Así que, bienvenidos nuevamente. Puedes decidir si quieres ser lector, fan, curioso o crítico. Si quieres divertirte con mis historias o buscarle el lado oscuro a cada línea. Puedes amar a este personaje principal lleno de contrastes o querer corregirlo.

Pero al final, hay algo que nunca cambiará: ¡La editorial soy yo!

Yo escribo, yo edito, yo publico, yo decido. Diseño mis páginas, comparto lo que quiero y como quiero, y si otros leen entre líneas, imaginan cosas o juzgan… allá ellos. Yo sigo dejando este libro abierto, una historia donde no todos conocen el final, ni falta que hace.`,
  },
  {
    id: '6',
    titulo: 'No todo vuelve, pero todo enseña',
    fecha_publicacion: '2025-06-20',
    url: 'https://lasletrasdemaju.blogspot.com/2025/06/no-todo-vuelve-pero-todo-ensena.html',
    extracto: 'No todos devuelven lo que damos. Me han atropellado varias veces, personas de las que esperaba un poco más…',
    contenido: `Esta es mi queja de hoy:

No todos devuelven lo que damos. Me han atropellado varias veces, personas de las que esperaba un poco más… un gesto, una palabra, una acción. Algo que confirmara que sienten lo mismo. Que harían por uno lo que uno haría por ellos.

Pero en tu silencio —ese que solo tú entiendes— repasas todos los escenarios y te quedas con el mejor, aunque sabes que el peor es el más probable. Aun así, te aferras. A lo que da paz. A lo que da esperanza. Y entonces te mientes. Sobrevives con esa mentira cada vez que algo te vuelve a apretar el pecho. Aunque sabes que no va a cambiar, sigues esperando.

Otro golpe de fe, porque insistes en ser bueno. Porque prefieres creer en lo bonito, en lo recíproco, en lo justo. Esperas, aunque hay cosas que no cambian. Solo se tapan por un rato con curitas que se despegan con los días. Pero igual esperas. Porque así eres: leal, constante, con la esperanza cansada pero viva. Y mientras tanto, te desgastas esperando que alguien haga lo que tú harías sin dudar. Vives como si algún día, por fin, el mejor escenario se hiciera real.

Y cuando no pasa, no te sorprende. Duele, sí. Pero no asombra.

Me vuelvo a sentar, vuelvo a pensar, y siempre llego al mismo punto: aunque la espera canse, lo que nace del corazón no se pierde.`,
  },
  {
    id: '7',
    titulo: 'Nunca recibí rosas',
    fecha_publicacion: '2025-07-01',
    url: 'https://lasletrasdemaju.blogspot.com/2025/07/nunca-recibi-rosas.html',
    extracto: 'Con lo que me gustan las rosas... Y solo las recibo en fechas obligatorias o por cortesía.',
    contenido: `Con lo que me gustan las rosas...
Y solo las recibo en fechas obligatorias o por cortesía (o al menos eso creo).
Pero me gustan, me encantan. Rojas o amarillas, aunque prefiero las rojas.
Tienen ese gesto elegante de fina coquetería.

Es que si algún día recibiera una rosa sin que haya una razón, sin que sea "un día especial", imagínense lo especial que me podría llegar a convertirse mi día y lo especial que me haría sentir.
Si ya me encantan, me enamoran el triple cuando no vienen acompañadas de una fecha especial o una excusa.

Me encantan las rosas.
Rojas, si es posible.
E inesperadas, por favor.
De esas que me hagan sentir que merezco a alguien que se emocione más que yo al verme recibirlas.`,
  },
  {
    id: '8',
    titulo: 'Entre villanos y mariposas',
    fecha_publicacion: '2025-09-01',
    url: 'https://lasletrasdemaju.blogspot.com/2025/09/entre-villanos-y-mariposas.html',
    extracto: 'Siempre sentí una extraña fascinación por los chicos imposibles. Esos que parecen de todos, pero cuando te miran... son solo tuyos.',
    contenido: `Siempre sentí una extraña fascinación por los chicos imposibles. Esos que parecen de todos, pero cuando te miran... son solo tuyos. Libres, rebeldes, intensos. El tipo de amor que no se puede domar, pero que por un instante te elige y te hace sentir la única en el universo.

Tenía apenas once años cuando me gustó el primero. Él hacía girar las miradas sin esfuerzo, como si el mundo fuera suyo. Y yo, en ese entonces... solo una niña común, silenciosa, temerosa, protegida hasta el alma por mis padres. Pero entre tantas, me vio a mí. No sé cómo ni por qué, pero me vio. Y desde ese momento, todo en él parecía un show dedicado a mí: hacía de todo por llamar mi atención, como si en mí encontrara un rincón distinto. Fue el primero en escribirme cartas de amor, y eso, en mi mundo de cuentos, lo convirtió en el príncipe más valiente.

Muchos años después llegó otro. Tan seguro de sí mismo, tan indomable. No le temía a nada ni a nadie. Me quiso, sí, con una intensidad que no me dejó pensar. Me presumió, me dedicó tiempo, me regaló detalles y presencia. Y luego me rompió. Porque no sabía lo que quería. Ya me tenía, pero buscaba más. Más trofeos, más miradas. Y así, sin saberlo, me perdió.

Después tuve un pretendiente, alguien que nunca formalizó nada ni llegamos a salir realmente. Era de esos que, con solo hablarte, te hacen sentir que flotas: un alma fuerte, magnética, con esa mezcla de ternura y peligro que te roba el aliento. Él sabía que era un chico malo y yo, una chica buena. Cuando realmente me conoció, tuvo el valor, como gesto de cariño, de alejarse antes de hacerme daño. Me dijo: "Eres una gran mujer, y no quiero romperte". Y aunque dolió, entendí. Yo también lo sabía.

La etapa de los chicos malos quedó en pausa por muchos años, hasta que apareció otro, un día cualquiera… Al principio todo parecía normal, nada especial… pero de repente, todo cambió, y caí otra vez, rendida ante un chico malo más. Este era diferente a los otros: imponente ante el mundo, audaz y seguro, pero a solas conmigo, un alma frágil y vulnerable, capaz de mostrarse tal como era, sin máscaras, sin reservas.

Y luego huyó. Tal vez porque mi intensidad lo desbordó, o porque temió perderse en lo que sentía y no saber cómo regresar. Quizás mi corazón libre le pareció un océano demasiado grande para nadar, y decidió dejarme, no por falta de cariño, sino para no romper lo que él no podía sostener.

También conocí buenos chicos, de esos que saben querer bien, pero les faltaba algo… esa chispa que enciende todo. Pero es curioso: con estos "chicos buenos" parecía todo correcto, seguro, dulce… pero al final, descubrí que también había un chico malo oculto en su interior. Ese lado que hasta entonces permanecía invisible, y que solo se dejó ver al final, recordándome que los chicos malos siempre encuentran la manera de aparecer, incluso donde menos lo esperas.

Al final, si algún villano me encuentra, espero que me haga sentir viva, que me mueva el corazón, que me rete y me haga brillar… y sobre todo, que se atreva a quedarse con este caos que soy. Porque sí, soy demasiado sociable, demasiado extrovertida, inquieta, imposible de contener… y muchos huyen de eso. No es nada malo; simplemente, los chicos inseguros o miedosos no saben qué hacer con alguien como yo.

Alguien seguro de sí mismo, que entienda que si soy un torbellino, no es un problema, sino una invitación a vivirlo todo con intensidad. Que sepa que no hay nada de malo en querer pasión, aventuras y un amor que no se pueda domar.`,
  },
  {
    id: '9',
    titulo: 'Necesité',
    fecha_publicacion: '2025-10-01',
    url: 'https://lasletrasdemaju.blogspot.com/2025/10/necesite.html',
    extracto: 'Necesidad... Hice muchas cosas en mi vida por necesidad, me tragué el orgullo.',
    contenido: `Necesidad... Hice muchas cosas en mi vida por necesidad, me tragué el orgullo. Me sometí a trabajos que me rompían el cuerpo y a relaciones que me deshacían el alma. A humillaciones disfrazadas de oportunidades. A silencios que eran gritos atragantados.

Dicen que la necesidad tiene cara de perro. Pero no. La necesidad es el perro. Y uno la ve venir. Te huele desde lejos. Te reconoce. Se te acerca con los dientes apretados y los ojos encendidos. Te olfatea el miedo, la angustia, el hambre, la soledad, y cuando huele todo eso en ti… te muerde. Y cuando los demás huelen que estás así, medio rota, medio desesperada, también te muerden. Porque hay gente que no ama, devora. Y si te ven débil, te mastican sin culpa.

Yo necesité… y me usaron. Porque sabían que no podía decir que no. Porque cuando necesitas, tu dignidad también se pone en rebaja. Y ellos lo saben. Entonces te ofrecen migajas y te exigen gratitud.

También necesité afecto. Y ese duele distinto. Porque uno puede vivir sin plata, pero no sin cariño. Y ahí se entrega uno a todo… a medias atenciones, a "te quiero" sin hechos, amores que no abrigan pero tampoco sueltan. A gente que no sabe querer, pero sí manipular.

Al final, todos hemos tenido hambre de algo: de amor, de atención, de una oportunidad. Todos hemos sentido esa mordida. Pero uno se cansa y un día cualquiera uno se elige, porque ya no quiere repetir lo mismo. Y cuando uno dice "no más" se ofenden. Como si uno tuviera que agradecer lo poco.

Entonces, cuando la necesidad vuelve, cuando reconoces que mereces más, ya no eres su presa. Porque aprendiste a reconocer su olor, su sombra, su paso, y esta vez eres tú quien le muestra los dientes.

Estas son mis letras. Pero también pueden ser las tuyas... Las letras de MaJu`,
  },
];

interface PostCardProps {
  post: Post;
  index: number;
}

const PostCard = ({ post, index }: PostCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const rx = useSpring(rotX, { stiffness: 300, damping: 30 });
  const ry = useSpring(rotY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-y * 10);
    rotY.set(x * 10);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
    setIsHovered(false);
  };

  const padNum = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/escrito/${post.id}`)}
      className="group relative cursor-pointer"
      ref={cardRef}
    >
      <motion.div
        className="glass h-full overflow-hidden"
        style={{
          padding: '24px',
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isHovered ? -4 : 0,
          boxShadow: isHovered
            ? '0 16px 40px rgba(155,35,85,0.25)'
            : '0 8px 32px rgba(180,80,160,0.18)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
            style={{ background: isHovered ? 'rgba(155,35,85,0.18)' : 'rgba(155,35,85,0.1)' }}
          >
            <BookOpen className="w-5 h-5" style={{ color: 'hsl(var(--color-primary))' }} />
          </div>
          <motion.div animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.4 }} transition={{ duration: 0.2 }}>
            <ArrowRight className="w-5 h-5" style={{ color: 'hsl(var(--color-primary))' }} />
          </motion.div>
        </div>

        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(155,35,85,0.5)',
          marginBottom: '10px',
        }}>
          {padNum} · Blog
        </div>

        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '16px',
          fontStyle: 'italic',
          color: 'hsl(var(--color-text-mid))',
          lineHeight: 1.5,
          marginBottom: '10px',
        }}>
          {post.titulo}
        </h3>

        <p style={{
          fontSize: '13px',
          color: 'hsl(var(--color-text-soft))',
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {post.extracto}
        </p>
      </motion.div>
    </motion.article>
  );
};

const Publicaciones = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { posts } = usePosts();

  const displayPosts = posts && posts.length > 0 ? posts : postsData;

  return (
    <section id="publicaciones" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-title"
            >
              Entradas del Blog
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="section-divider"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: 'hsl(var(--color-text-soft))',
                fontSize: '16px',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              Fragmentos de mi alma, historias que mecen el corazón.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publicaciones;
