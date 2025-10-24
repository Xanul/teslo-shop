# Diagrama de Componentes - Teslo Shop

## 1. Diagrama General de Arquitectura

```mermaid
graph TB
    subgraph Store["🎯 State Management"]
        Zustand["Zustand Store<br/>useUIStore<br/>- isSideMenuOpen"]
    end

    subgraph Config["⚙️ Configuración"]
        Fonts["Fonts Config<br/>- Montserrat_Alternates"]
        SidebarConfig["Sidebar Config<br/>- SIDEBAR_ITEMS"]
    end

    subgraph Interfaces["📋 Interfaces & Types"]
        ProductInterface["Product Interface<br/>- Product<br/>- Size<br/>- Gender<br/>- Type"]
    end

    subgraph UIComponents["🎨 UI Components (Genéricos)"]
        TopMenu["TopMenu<br/>👤 Client Component"]
        NavLink["NavLink"]
        CartBadge["CartBadge"]

        Sidebar["Sidebar<br/>👤 Client Component"]
        SidebarSection["SidebarSection"]
        SidebarMenuItem["SidebarMenuItem"]

        PageTitle["PageTitle"]
        PageNotFound["PageNotFound"]
    end

    subgraph ProductComponents["📦 Componentes de Productos"]
        ProductGrid["ProductGrid"]
        ProductGridItem["ProductGridItem<br/>👤 Client Component"]

        ProductSlideshow["ProductSlideshow<br/>👤 Client Component"]
        SizeSelector["SizeSelector"]
        QuantitySelector["QuantitySelector<br/>👤 Client Component"]
    end

    subgraph External["📚 Librerías Externas"]
        ReactIcons["react-icons/io5"]
        Swiper["swiper"]
        Tailwind["Tailwind CSS<br/>+ clsx/merge"]
        Next["Next.js<br/>Image, Link, Fonts"]
    end

    %% Conexiones del Store
    Zustand -->|openSideMenu/closeSideMenu| TopMenu
    Zustand -->|isSideMenuOpen| Sidebar

    %% Conexiones de TopMenu
    TopMenu -->|children| NavLink
    TopMenu -->|children| CartBadge
    TopMenu -->|usa| ReactIcons
    TopMenu -->|usa| Tailwind

    %% Conexiones de Sidebar
    Sidebar -->|children| SidebarSection
    Sidebar -->|config| SidebarConfig
    SidebarSection -->|children| SidebarMenuItem
    SidebarMenuItem -->|usa| ReactIcons
    Sidebar -->|usa| Zustand

    %% Conexiones de ProductGrid
    ProductGrid -->|children| ProductGridItem
    ProductGrid -->|recibe| ProductInterface

    %% Conexiones de ProductGridItem
    ProductGridItem -->|usa| Next
    ProductGridItem -->|recibe| ProductInterface
    ProductGridItem -->|usa| Tailwind

    %% Conexiones de detalles de producto
    ProductSlideshow -->|usa| Swiper
    ProductSlideshow -->|usa| Tailwind
    SizeSelector -->|recibe| ProductInterface
    QuantitySelector -->|usa| ReactIcons

    %% Conexiones de config y interfaces
    Config -->|proporciona| TopMenu
    Config -->|proporciona| Sidebar
    Interfaces -->|tipado| ProductGrid
    Interfaces -->|tipado| ProductGridItem
    Interfaces -->|tipado| ProductSlideshow
    Interfaces -->|tipado| SizeSelector

    style Store fill:#ff6b6b
    style Config fill:#4ecdc4
    style Interfaces fill:#45b7d1
    style UIComponents fill:#96ceb4
    style ProductComponents fill:#ffeaa7
    style External fill:#dfe6e9
```

---

## 2. Diagrama Jerárquico (Composición)

```mermaid
graph TD
    App["🏠 App Layout"]

    App -->|usa| TopMenu["TopMenu<br/>(Client)"]
    App -->|usa| Sidebar["Sidebar<br/>(Client)"]

    TopMenu --> TopMenuChildren["├─ NavLink<br/>├─ CartBadge"]

    Sidebar --> SidebarChildren["├─ SidebarSection<br/>│  └─ SidebarMenuItem<br/>├─ SidebarSection<br/>│  └─ SidebarMenuItem"]

    App -->|usa| PageTitle["PageTitle"]
    App -->|renderiza| PageNotFound["PageNotFound"]

    App -->|renderiza| ProductGrid["ProductGrid<br/>(Server)"]
    ProductGrid --> ProductGridItem["ProductGridItem<br/>(Client)"]
    ProductGridItem -->|renderiza| ProductItems["Múltiples items<br/>de productos"]

    App -->|renderiza| ProductDetail["Página de Detalle"]
    ProductDetail -->|usa| ProductSlideshow["ProductSlideshow<br/>(Client)<br/>Swiper"]
    ProductDetail -->|usa| SizeSelector["SizeSelector"]
    ProductDetail -->|usa| QuantitySelector["QuantitySelector<br/>(Client)"]

    style App fill:#ff7675
    style TopMenu fill:#00b894
    style Sidebar fill:#00b894
    style ProductGrid fill:#fdcb6e
    style ProductGridItem fill:#fdcb6e
    style ProductSlideshow fill:#6c5ce7
    style SizeSelector fill:#6c5ce7
    style QuantitySelector fill:#6c5ce7
    style ProductDetail fill:#a29bfe
```

---

## 3. Diagrama de Flujo de Datos (Data Flow)

```mermaid
graph LR
    subgraph Input["🔵 Entrada"]
        ProductData["📊 Product Data<br/>Array de productos"]
    end

    subgraph Processing["🟡 Procesamiento"]
        ProductGrid["ProductGrid<br/>Mapea array"]
        ProductGridItem["ProductGridItem<br/>Renderiza tarjeta"]
        OnHover["Evento Hover<br/>Cambia imagen"]
    end

    subgraph State["🔴 Estado"]
        LocalState["Estado Local<br/>- imageIndex<br/>- selectedSize<br/>- quantity"]
        UIStore["Zustand Store<br/>- sideMenuOpen"]
    end

    subgraph Output["🟢 Output"]
        UI["🎨 UI Renderizado"]
        UserActions["👆 Interacciones"]
    end

    ProductData -->|props| ProductGrid
    ProductGrid -->|props| ProductGridItem
    ProductGridItem -->|maneja| OnHover
    OnHover -->|actualiza| LocalState
    LocalState -->|renderiza| UI
    UIStore -->|controla| UI
    UI -->|user click| UserActions
    UserActions -->|actualiza| LocalState
    UserActions -->|toggle| UIStore

    style Input fill:#ff7675
    style Processing fill:#fdcb6e
    style State fill:#00b894
    style Output fill:#6c5ce7
```

---

## 4. Diagrama de Dependencias (Dependencies)

```mermaid
graph TB
    subgraph React_Ecosystem["React & Next.js"]
        React["react"]
        NextImage["next/image"]
        NextLink["next/link"]
        NextFonts["next/fonts"]
    end

    subgraph State_Management["State Management"]
        Zustand["zustand"]
    end

    subgraph UI_Libraries["UI Libraries"]
        ReactIcons["react-icons"]
        Swiper["swiper"]
        TailwindCSS["tailwindcss"]
    end

    subgraph Utilities["Utilities"]
        Clsx["clsx"]
        TailwindMerge["tailwind-merge"]
    end

    subgraph Internal["Internal Modules"]
        Interfaces["@/interfaces"]
        Config["@/config"]
        Store["@/store"]
        Utils["@/lib/utils"]
    end

    TopMenu -->|usa| React
    TopMenu -->|usa| Zustand
    TopMenu -->|usa| ReactIcons

    ProductSlideshow -->|usa| React
    ProductSlideshow -->|usa| Swiper

    ProductGridItem -->|usa| NextImage
    ProductGridItem -->|usa| NextLink

    Utils -->|combina| Clsx
    Utils -->|combina| TailwindMerge

    AllComponents["Todos los componentes"] -->|usa| Utils
    AllComponents -->|usa| Interfaces
    AllComponents -->|usa| Config
    AllComponents -->|usa| TailwindCSS

    style React_Ecosystem fill:#61dafb,color:#000
    style State_Management fill:#764abc,color:#fff
    style UI_Libraries fill:#ff6b6b,color:#fff
    style Utilities fill:#4ecdc4,color:#fff
    style Internal fill:#96ceb4,color:#000
```

---

## 5. Matriz de Responsabilidades

| Componente | Responsabilidad | Tipo | Dependencias |
|-----------|------------------|------|--------------|
| **TopMenu** | Navegación principal, carrito | Client | Zustand, ReactIcons |
| **NavLink** | Enlace individual | Presentational | - |
| **CartBadge** | Badge de contador | Presentational | - |
| **Sidebar** | Menú lateral | Client | Zustand, Config |
| **SidebarSection** | Agrupador de items | Presentational | - |
| **SidebarMenuItem** | Item del sidebar | Presentational | ReactIcons |
| **PageTitle** | Título de página | Presentational | Config/Fonts |
| **PageNotFound** | Página 404 | Presentational | Image |
| **ProductGrid** | Lista de productos | Server | ProductGridItem |
| **ProductGridItem** | Tarjeta de producto | Client | ProductInterface, Image |
| **ProductSlideshow** | Carrusel de imágenes | Client | Swiper |
| **SizeSelector** | Selector de tallas | Presentational | ProductInterface |
| **QuantitySelector** | Selector de cantidad | Client | ReactIcons |

---

## 6. Ciclo de Vida de Interacción

```mermaid
sequenceDiagram
    actor User
    participant TopMenu
    participant Zustand
    participant Sidebar
    participant ProductGrid
    participant ProductGridItem

    User->>TopMenu: Click hamburguer menu
    TopMenu->>Zustand: openSideMenu()
    Zustand->>Sidebar: isSideMenuOpen = true
    Sidebar-->>User: Mostrar menu

    User->>ProductGridItem: Hover sobre producto
    ProductGridItem->>ProductGridItem: Cambiar imageIndex
    ProductGridItem-->>User: Mostrar siguiente imagen

    User->>ProductGridItem: Click en producto
    ProductGridItem->>User: Navegar a /product/{slug}

    User->>Sidebar: Click en link del sidebar
    Sidebar->>Zustand: closeSideMenu()
    Zustand-->>Sidebar: isSideMenuOpen = false
    Sidebar-->>User: Cerrar menu
```

---

## 7. Estructura de Carpetas (Visual)

```
src/components/
│
├── index.ts ✅ Barrel Export
│
├── ui/ 🎨 Componentes Genéricos
│   ├── top-menu/
│   │   ├── TopMenu.tsx (Client)
│   │   ├── NavLink.tsx
│   │   └── CartBadge.tsx
│   │
│   ├── sidebar/
│   │   ├── Sidebar.tsx (Client)
│   │   ├── SidebarSection.tsx
│   │   └── SidebarMenuItem.tsx
│   │
│   ├── title/
│   │   └── PageTitle.tsx
│   │
│   └── not-found/
│       └── PageNotFound.tsx
│
├── products/ 📦 Lista de Productos
│   └── product-grid/
│       ├── ProductGrid.tsx (Server)
│       └── ProductGridItem.tsx (Client)
│
├── product/ 📋 Detalle de Producto
│   ├── slideshow/
│   │   ├── ProductSlideshow.tsx (Client)
│   │   └── slideshow.css
│   │
│   ├── size-selector/
│   │   └── SizeSelector.tsx
│   │
│   └── quantity-selector/
│       └── QuantitySelector.tsx (Client)
│
└── cart/ 🛒 Carrito (Próximamente)
```

---

## 8. Tabla de Componentes con Detalles Técnicos

| # | Componente | Ubicación | Tipo | Estado | Props | Hooks | Librerías |
|---|-----------|-----------|------|--------|-------|-------|-----------|
| 1 | TopMenu | ui/top-menu | Client | ✅ | - | useUIStore | zustand, react-icons |
| 2 | NavLink | ui/top-menu | Presentational | ✅ | href, label | - | - |
| 3 | CartBadge | ui/top-menu | Presentational | ✅ | count | - | react-icons |
| 4 | Sidebar | ui/sidebar | Client | ✅ | - | useUIStore | zustand, react-icons |
| 5 | SidebarSection | ui/sidebar | Presentational | ✅ | title, children | - | - |
| 6 | SidebarMenuItem | ui/sidebar | Presentational | ✅ | icon, label, href | - | react-icons |
| 7 | PageTitle | ui/title | Presentational | ✅ | title, subtitle | - | @/config/fonts |
| 8 | PageNotFound | ui/not-found | Presentational | ✅ | - | - | next/image |
| 9 | ProductGrid | products/product-grid | Server | ✅ | products: Product[] | - | - |
| 10 | ProductGridItem | products/product-grid | Client | ✅ | product: Product | useState | next/image, next/link |
| 11 | ProductSlideshow | product/slideshow | Client | ✅ | images: string[] | useState | swiper |
| 12 | SizeSelector | product/size-selector | Presentational | ✅ | sizes: Size[], onSelect | - | - |
| 13 | QuantitySelector | product/quantity-selector | Client | ✅ | quantity, onQuantityChange | useState | react-icons |

---

## 9. Notas de Implementación

### ✅ Fortalezas
- Componentes bien separados por responsabilidad
- Uso de Client/Server components apropiado
- Barrel exports para imports limpios
- Configuración centralizada
- Tipos TypeScript bien definidos
- Uso eficiente de Zustand para estado global

### 🔄 Áreas de Mejora
- Componentes de `cart/` sin implementar
- Podría haber más abstracción en selectores de tamaño/cantidad
- Considerar un contexto de tema para dark mode futuro

### 📚 Patrones Utilizados
1. **Composition Pattern** (Sidebar con Sections y MenuItems)
2. **Container/Presentational** (TopMenu/Sidebar vs NavLink/MenuItem)
3. **Barrel Exports** (index.ts)
4. **Type Safety** (Interfaces compartidas)
5. **State Management** (Zustand centralizado)

---

## 10. Cómo Usar Este Diagrama

1. **Diagrama General**: Entiende toda la arquitectura de una vistazo
2. **Diagrama Jerárquico**: Ve cómo se componen los componentes
3. **Flujo de Datos**: Sigue cómo fluyen los datos desde entrada a salida
4. **Dependencias**: Identifica qué librerías se usan donde
5. **Matriz**: Referencia rápida de responsabilidades
6. **Secuencia**: Comprende las interacciones del usuario

Puedes copiar cualquiera de estos diagramas Mermaid a:
- GitHub (renders automáticamente)
- [mermaid.live](https://mermaid.live) para editar
- Convertir a PNG/SVG con herramientas especializadas
