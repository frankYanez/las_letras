# 🌸 Guía de Cambios — Las Letras de MaJu

Documento de integración para el proyecto `las-letras.vercel.app`.  
Todos los cambios están organizados por sección, listos para aplicar directamente en el código.

---

## 1. TIPOGRAFÍA Y FUENTES

Agregar en el `<head>` del HTML principal (o en el archivo de estilos globales):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
```

En el CSS global:

```css
/* Fuentes base del sitio */
body {
  font-family: 'Lato', sans-serif;
}

/* Nombre del blog — cursiva elegante */
.logo, .hero-title, .section-title, footer .brand {
  font-family: 'Dancing Script', cursive;
  font-weight: 700;
}

/* Cuerpo de textos literarios, citas, "Sobre la autora" */
.about-text, .frase-text, blockquote {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}
```

---

## 2. NOMBRE DEL BLOG

Reemplazar en **todos** los lugares donde aparezca el nombre actual:

```
ANTES:  Las Letras de Maju
ANTES:  Las letras de MaJu
DESPUÉS: Las Letras de MaJu
```

> ⚠️ La "J" y la "u" van en mayúscula: **MaJu** — respetar exactamente esta grafía.

En el navbar / header, cambiar así:

```html
<!-- ANTES -->
<a class="navbar-brand">Las letras de MaJu</a>

<!-- DESPUÉS -->
<a class="navbar-brand" style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; font-weight: 700; color: #8b1a45;">
  Las Letras de MaJu
</a>
```

En el `<title>` del HTML:

```html
<title>Las Letras de MaJu</title>
```

---

## 3. PALETA DE COLORES — ESTÉTICA ROSA / LILA

Reemplazar el esquema de colores actual por estas variables CSS.  
Agregar al inicio del archivo CSS global o en `:root`:

```css
:root {
  /* Gradiente de fondo principal */
  --bg-gradient: linear-gradient(
    135deg,
    #fce4f0 0%,
    #f8c8e8 20%,
    #f0a8d8 40%,
    #e8c4ee 60%,
    #d4a8e8 80%,
    #c890d8 100%
  );

  /* Colores de marca */
  --color-primary:       #8b1a45;   /* rosa oscuro — títulos */
  --color-primary-light: #b03070;   /* rosa medio — hover, acentos */
  --color-secondary:     #9b2355;   /* rosa vibrante — CTAs */
  --color-text-dark:     #5a1030;   /* texto oscuro */
  --color-text-mid:      #7a1545;   /* texto medio */
  --color-text-soft:     #6b1035;   /* texto suave */

  /* Glass */
  --glass-bg:            rgba(255, 255, 255, 0.22);
  --glass-bg-deep:       rgba(255, 255, 255, 0.32);
  --glass-border:        rgba(255, 255, 255, 0.45);
  --glass-border-strong: rgba(255, 255, 255, 0.55);
  --glass-shadow:        0 8px 32px rgba(180, 80, 160, 0.18),
                         0 2px 8px rgba(255, 255, 255, 0.3) inset;
  --glass-shadow-deep:   0 12px 40px rgba(180, 80, 160, 0.22),
                         0 2px 10px rgba(255, 255, 255, 0.35) inset;
}
```

Fondo del `body`:

```css
body {
  min-height: 100vh;
  background: var(--bg-gradient);
  color: var(--color-text-dark);
  overflow-x: hidden;
  position: relative;
}
```

---

## 4. EFECTO GLASSMORFISMO

Agregar estas clases utilitarias al CSS. Aplicarlas en tarjetas, navbar, secciones, etc.:

```css
/* Glass base */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  border-radius: 20px;
}

/* Glass profundo — para secciones importantes */
.glass-deep {
  background: var(--glass-bg-deep);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border-strong);
  box-shadow: var(--glass-shadow-deep);
  border-radius: 24px;
}
```

**Dónde aplicar `.glass`:**
- Tarjetas de entradas del blog
- Tarjetas de la sección de videos
- Tarjetas de frases
- Navbar

**Dónde aplicar `.glass-deep`:**
- Tarjeta "Sobre la Autora"
- Hero (si tiene una caja de contenido)

---

## 5. BLOBS ANIMADOS (fondo decorativo)

Agregar al CSS global para el efecto de burbujas de color de fondo:

```css
body::before {
  content: '';
  position: fixed;
  top: -20%;
  left: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(255, 182, 220, 0.5) 0%, transparent 70%);
  border-radius: 50%;
  animation: blob1 8s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 0;
}

body::after {
  content: '';
  position: fixed;
  bottom: -20%;
  right: -10%;
  width: 55%;
  height: 55%;
  background: radial-gradient(circle, rgba(200, 144, 216, 0.45) 0%, transparent 70%);
  border-radius: 50%;
  animation: blob2 10s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 0;
}

@keyframes blob1 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(5%, 8%) scale(1.1); }
}

@keyframes blob2 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-5%, -8%) scale(1.08); }
}

/* Asegurar que el contenido va encima de los blobs */
.page-wrapper, main, header, footer {
  position: relative;
  z-index: 1;
}
```

---

## 6. SECCIÓN HERO — SUBTÍTULO ACTUALIZADO

Reemplazar el subtítulo actual del hero por:

```html
<p class="hero-subtitle">
  La adrenalina al escribir es como una montaña de emociones,
  a veces quiero hacer cosas grandes jugando con las palabras,
  otras solo concibo redactar sin ninguna pasión.
</p>
```

CSS para el subtítulo:

```css
.hero-subtitle {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(15px, 2.2vw, 20px);
  color: var(--color-text-soft);
  max-width: 560px;
  line-height: 1.8;
  margin: 0 auto 40px;
  text-align: center;
}
```

---

## 7. SECCIÓN "SOBRE LA AUTORA" — HTML COMPLETO

Reemplazar o crear la sección existente con este bloque:

```html
<section id="sobre-la-autora" class="about-section">
  <h2 class="section-title">Sobre la Autora</h2>
  <div class="section-divider"></div>

  <div class="about-card glass-deep">
    <div class="about-img-wrap">
      <!--
        IMAGEN: usar la foto adjunta (MaJu__2_.png)
        Reemplazar src con la ruta real en el proyecto
      -->
      <img
        src="/assets/images/maju-autora.png"
        alt="Foto de Maye, autora de Las Letras de MaJu"
        class="about-img"
      />
    </div>

    <div class="about-content">
      <span class="about-tag">✦ Libro abierto</span>
      <h3 class="about-name">Hola, soy Maye.</h3>
      <div class="about-text">
        <p>
          ...y sí, soy un libro abierto. Siempre lo he sido y,
          sinceramente, no tengo planes de cerrarme.
        </p>
        <p>
          Escribo porque siento mucho, pienso demasiado y porque
          algunas emociones encuentran mejor su lugar en las palabras
          que en el silencio.
        </p>
        <p class="about-highlight">
          Aquí todas las emociones tienen hogar.
        </p>
        <p>
          Las letras de MaJu es mi manera de conversar con el mundo y,
          a veces, conmigo misma. Un espacio donde las experiencias se
          convierten en historias, las preguntas encuentran refugio y
          las emociones pueden existir sin filtros.
        </p>
        <p>
          Si alguna vez alguna de mis letras logra acompañarte,
          abrazarte o ayudarte a ponerle nombre a lo que sientes,
          entonces habrá valido la pena compartirlas.
        </p>
        <p class="about-highlight">
          Estas son mis letras pero también pueden ser las tuyas.
        </p>
        <p>¡Bienvenidos!</p>
      </div>
    </div>
  </div>
</section>
```

CSS para esta sección:

```css
.about-section {
  padding: 60px 0;
}

.about-card {
  padding: 48px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  align-items: start;
}

/* Responsive */
@media (max-width: 640px) {
  .about-card {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}

.about-img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 16px 40px rgba(155, 35, 85, 0.25);
}

.about-tag {
  display: inline-block;
  background: rgba(180, 60, 120, 0.15);
  border: 1px solid rgba(180, 60, 120, 0.3);
  border-radius: 50px;
  padding: 5px 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-secondary);
  margin-bottom: 16px;
}

.about-name {
  font-family: 'Dancing Script', cursive;
  font-size: 48px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 20px;
  line-height: 1.1;
}

.about-text {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 15px;
  line-height: 1.9;
  color: var(--color-text-dark);
}

.about-text p {
  margin-bottom: 16px;
}

.about-highlight {
  font-family: 'Dancing Script', cursive !important;
  font-style: normal !important;
  font-size: 20px !important;
  color: var(--color-primary) !important;
  font-weight: 600 !important;
}
```

> 📌 **Imagen:** Guardar el archivo `MaJu__2_.png` (adjunto en el chat) como `/assets/images/maju-autora.png` en el proyecto.

---

## 8. SECCIÓN ENTRADAS DEL BLOG

Lista completa de entradas a agregar/actualizar. Si el proyecto tiene un array de posts, reemplazarlo por este:

```js
const posts = [
  {
    id: 1,
    title: "Mi primer día de trabajo",
    url: "https://lasletrasdemaju.blogspot.com/2020/02/mi-primer-dia-de-trabajo.html?m=1"
  },
  {
    id: 2,
    title: "Y esta vez es muy es muy personal...",
    url: "https://lasletrasdemaju.blogspot.com/2025/03/y-esta-vez-es-muy-es-muy-personal.html?m=1"
  },
  {
    id: 3,
    title: "Gracias Kary por ese espejo",
    url: "https://lasletrasdemaju.blogspot.com/2025/04/gracias-kary-por-ese-espejo.html?m=1"
  },
  {
    id: 4,
    title: "Caos, el arte de arder sin quemarme",
    url: "https://lasletrasdemaju.blogspot.com/2025/06/caos-el-arte-de-arder-sin-quemarme.html?m=1"
  },
  {
    id: 5,
    title: "La editorial soy yo, y el libro está abierto",
    url: "https://lasletrasdemaju.blogspot.com/2025/06/la-editorial-soy-yo-y-el-libro-esta.html?m=1"
  },
  {
    id: 6,
    title: "No todo vuelve, pero todo enseña",
    url: "https://lasletrasdemaju.blogspot.com/2025/06/no-todo-vuelve-pero-todo-ensena.html?m=1"
  },
  {
    id: 7,
    title: "Nunca recibí rosas",
    url: "https://lasletrasdemaju.blogspot.com/2025/07/nunca-recibi-rosas.html?m=1"
  },
  {
    id: 8,
    title: "Entre villanos y mariposas",
    url: "https://lasletrasdemaju.blogspot.com/2025/09/entre-villanos-y-mariposas.html?m=1"
  },
  {
    id: 9,
    title: "Necesité",
    url: "https://lasletrasdemaju.blogspot.com/2025/10/necesite.html?m=1"
  }
];
```

HTML de cada tarjeta de entrada (si no se genera dinámicamente, copiar y adaptar este patrón):

```html
<a class="post-card glass" href="URL_DEL_POST" target="_blank" rel="noopener">
  <div class="post-num">01 · Blog</div>
  <h3 class="post-title">Título del post</h3>
  <span class="post-arrow">→</span>
</a>
```

CSS para las tarjetas de posts:

```css
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}

.post-card {
  padding: 24px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  display: block;
  color: inherit;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(155, 35, 85, 0.25);
}

.post-num {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(155, 35, 85, 0.5);
  margin-bottom: 10px;
}

.post-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-style: italic;
  color: var(--color-text-mid);
  line-height: 1.5;
  margin-bottom: 12px;
}

.post-arrow {
  font-size: 18px;
  color: rgba(155, 35, 85, 0.4);
  transition: color 0.2s;
}

.post-card:hover .post-arrow {
  color: var(--color-secondary);
}
```

---

## 9. SECCIÓN "FRASES" — NUEVA SECCIÓN COMPLETA

Agregar esta sección completa al HTML (después de las entradas o donde se indique):

```html
<section id="frases" class="frases-section">
  <h2 class="section-title">Frases</h2>
  <div class="section-divider"></div>

  <div class="frase-card glass-deep">
    <p class="frase-text">
      He conocido mucha gente mediocre toreándose en grandes plazas,
      y no me han llamado nunca la atención. Disfruto de aquellos que
      viven creyéndose jodidamente brillantes y simplemente proyectando,
      eso terminan brillando. A veces creer en algo te hace ganador.
    </p>
  </div>

  <div class="frase-card glass">
    <p class="frase-text">
      Todo lo que hoy me hace feliz, en algún momento me dio miedo...
    </p>
  </div>

  <div class="frase-card glass-deep">
    <p class="frase-text">
      Odio estar encerrada sin poder salir de casa. No es lo mismo
      mirar el sol a través de una ventana.
    </p>
  </div>
</section>
```

CSS para las frases:

```css
.frases-section {
  padding: 40px 0 60px;
}

.frase-card {
  padding: 32px 36px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

/* Comilla decorativa gigante */
.frase-card::before {
  content: '\201C';
  font-family: 'Playfair Display', serif;
  font-size: 120px;
  color: rgba(155, 35, 85, 0.1);
  position: absolute;
  top: -10px;
  left: 16px;
  line-height: 1;
  pointer-events: none;
}

.frase-text {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-style: italic;
  color: var(--color-text-soft);
  line-height: 1.8;
  position: relative;
  z-index: 1;
  padding-left: 16px;
}
```

---

## 10. HELPER CSS — SECCIÓN DIVIDER Y TÍTULOS

Agregar estilos globales para los títulos de sección y el divisor decorativo:

```css
.section-title {
  font-family: 'Dancing Script', cursive;
  font-size: 42px;
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 8px;
}

.section-divider {
  width: 80px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(155, 35, 85, 0.6),
    transparent
  );
  margin: 12px auto 40px;
}
```

---

## 11. VIDEOS — ESTRUCTURA DE SECCIÓN

La sección de videos espera 3 archivos. Ajustar las rutas `src` según donde estén guardados en el proyecto:

```html
<section id="videos" class="section">
  <h2 class="section-title">En Movimiento</h2>
  <div class="section-divider"></div>

  <div class="video-grid">

    <div class="video-card glass">
      <video
        src="/assets/videos/video-1.mp4"
        poster="/assets/images/thumb-1.jpg"
        controls
        playsinline
        preload="metadata"
      ></video>
    </div>

    <div class="video-card glass">
      <video
        src="/assets/videos/video-2.mp4"
        poster="/assets/images/thumb-2.jpg"
        controls
        playsinline
        preload="metadata"
      ></video>
    </div>

    <div class="video-card glass">
      <video
        src="/assets/videos/video-3.mp4"
        poster="/assets/images/thumb-3.jpg"
        controls
        playsinline
        preload="metadata"
      ></video>
    </div>

  </div>
</section>
```

CSS para la grilla de videos:

```css
.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 640px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}

.video-card {
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 9 / 16;
  position: relative;
  transition: transform 0.3s;
}

.video-card:hover {
  transform: translateY(-4px);
}

.video-card video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 20px;
}
```

> 📌 **Archivos a subir al proyecto** (desde el link de transferencia):
> - `video-1.mp4` → `/assets/videos/video-1.mp4`
> - `video-2.mp4` → `/assets/videos/video-2.mp4`
> - `video-3.mp4` → `/assets/videos/video-3.mp4`
> - Foto autora `MaJu__2_.png` → `/assets/images/maju-autora.png`
> - Portada `Portada_Letras_de_MaJu.jpg` → `/assets/images/portada.jpg`

---

## 12. RESUMEN DE CAMBIOS — CHECKLIST

```
[ ] Agregar Google Fonts (Dancing Script, Playfair Display, Lato) en el <head>
[ ] Actualizar variables CSS con paleta rosa/lila
[ ] Agregar clases .glass y .glass-deep
[ ] Agregar blobs animados en body::before y body::after
[ ] Corregir nombre a "Las Letras de MaJu" en todos los archivos
[ ] Actualizar subtítulo del hero
[ ] Reemplazar/crear sección "Sobre la Autora" con foto y texto completo
[ ] Subir foto de Maye → /assets/images/maju-autora.png
[ ] Actualizar lista completa de entradas del blog (9 entradas)
[ ] Crear sección nueva "Frases" con los 3 textos
[ ] Subir los 3 videos y actualizar rutas en la sección de videos
[ ] Subir portada → /assets/images/portada.jpg
[ ] Verificar responsivo en móvil
```
