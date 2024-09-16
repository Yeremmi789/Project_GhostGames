import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';


// NOTAS A REPARAR
// Al entrar a un juego ya estando a una categoría, al momento de regresar
// la url no se establece a como estaba anteriormente
// revisar eso

@Component({
  selector: 'app-vista-categoria',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './vista-categoria.component.html',
  styleUrl: './vista-categoria.component.css'
})
export class VistaCategoriaComponent implements OnInit{

    constructor(
        private route: ActivatedRoute,
        private ruta: Router
    ){}

    json_categoria:any = [] ;
    usarArreglo1: boolean = true; // Propiedad de condición
    cat:string = "";

    ngOnInit(): void {
        this.route.paramMap.subscribe( parametro => {
            var categoria = parametro.get('categoria'); //colocar el nombre que se ha puesto en las rutas {path:'categoria/:categoria', compon}
            console.log(categoria);

            if (categoria === "Terror") {
                console.log("La categoria fue: ",categoria);
                this.json_categoria = [...this.c_terror];
                alert(categoria);
              } else if (categoria === "Aventura") {
                console.log("La categoria fue: ",categoria);
                this.json_categoria = [...this.c_aventuras];
                alert(categoria);
              } else {
                this.json_categoria = [];
                console.log("La categoria fue: ",categoria);
                alert("La categoría '" + categoria + "' NO está disponible, intente con otro porfavor.");
              }
        }); 

    }

    // cambiar posteriormente a string para mejorar la url y que no sean numeros ID // hacer cuando ya quede mayormente las funcionalidades del sitio
    verJuego(juegos_nombre: number){ //para colocar el nombre de la acción en la url
    // verJuego(juegos_nombre: string){ //para colocar el nombre de la acción en la url
        this.route.paramMap.subscribe( parametro => {
            var categoria = parametro.get('categoria'); //colocar el nombre que se ha puesto en las rutas {path:'categoria/:id', compon}
            this.ruta.navigate([`/explorando/categoria/${categoria}/detalles/${juegos_nombre}`]);
            alert('/explorando/categoria/'+categoria+'/detalles/'+juegos_nombre);
        });
    }

  c_aventuras = [
    {
        id: 1,
        name: "Bayonetta 3",
        description: "La bruja más poderosa regresa con combos aún más espectaculares y una historia épica.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Hack and slash"
    },
    {
        id: 2,
        name: "Ghost of Tsushima",
        description: "Un samurai lucha por liberar su isla de los invasores mongoles.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción aventura"
    },
    {
        id: 3,
        name: "Uncharted 4: A Thief's End",
        description: "La última aventura de Nathan Drake en busca de un tesoro perdido.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción aventura"
    },
    {
        id: 4,
        name: "Red Dead Redemption 2",
        description: "Un western épico ambientado en el Viejo Oeste.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción aventura"
    },
    {
        id: 5,
        name: "Assassin's Creed Valhalla",
        description: "Un vikingo lucha por un nuevo hogar en la Inglaterra medieval.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción aventura"
    },
    {
        id: 6,
        name: "The Witcher 3: Wild Hunt",
        description: "Un brujo errante en un mundo fantástico lleno de monstruos y magia.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "RPG de acción"
    },
    {
        id: 7,
        name: "Metal Gear Solid V: The Phantom Pain",
        description: "Un juego de infiltración y sigilo ambientado en la Guerra Fría.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción y sigilo"
    },
    {
        id: 8,
        name: "Dark Souls 3",
        description: "Un RPG de acción desafiante con combates frenéticos y un mundo oscuro y sombrío.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción RPG"
    },
    {
        id: 9,
        name: "NieR: Automata",
        description: "Un RPG de acción con una historia conmovedora y un mundo post-apocalíptico.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción RPG"
    },
    {
        id: 10,
        name: "Persona 5 Royal",
        description: "Un RPG japonés con combates por turnos y una historia sobre la juventud y la autodescubrimiento.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "JRPG"
    },
    {
        id: 11,
        name: "Elden Ring",
        description: "Un RPG de mundo abierto épico con combates frenéticos y una historia intrigante.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción RPG"
    },
    {
        id: 12,
        name: "God of War Ragnarok",
        description: "Kratos continúa su viaje en una nueva aventura llena de acción y mitología nórdica.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción aventura"
    },
    {
        id: 13,
        name: "Devil May Cry 5",
        description: "Acción frenética y estilos de combate espectaculares en este reinicio de la saga.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Hack and slash"
    },
    {
        id: 14,
        name: "Doom Eternal",
        description: "Un shooter en primera persona frenético y brutal con demonios y tecnología avanzada.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Shooter en primera persona"
    },
    {
        id: 15,
        name: "Sekiro: Shadows Die Twice",
        description: "Un juego de acción y sigilo con combates desafiantes y una estética japonesa.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción aventura"
    },
    {
        id: 16,
        name: "Titanfall 2",
        description: "Un shooter en primera persona con parkour, mechas gigantes y una campaña emocionante.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Shooter en primera persona"
    },
    {
        id: 17,
        name: "Hollow Knight",
        description: "Un metroidvania con una estética oscura y un combate desafiante.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Metroidvania"
    },
    {
        id: 18,
        name: "Celeste",
        description: "Un plataformas con una dificultad creciente y una historia conmovedora.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Plataformas"
    },
    {
        id: 19,
        name: "Bloodborne",
        description: "Un RPG de acción con combates frenéticos y un mundo gótico lleno de horrores.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Acción RPG"
    },
    {
        id: 20,
        name: "Hades",
        description: "Un roguelike con elementos de acción y un estilo visual impresionante.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Roguelike"
    }
]


  c_terror = [
      {
          id: 1,
          name: "Silent Hill 2",
          description: "Un clásico del terror psicológico que te sumerge en la niebla de un pueblo maldito.",
          image: "https://images.hdqwalls.com/download/silent-hill-2-vy-1080x1920.jpg",
          category: "Terror psicológico"
      },
      {
          id: 2,
          name: "Resident Evil 4",
          description: "Acción y supervivencia en un pueblo infectado por zombies y una misteriosa corporación.",
        //   image: "https://images.hdqwalls.com/wallpapers/2023-resident-evil-4-4k-ao.jpg",
          image: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2017/02/resident-evil-4-caratula.jpg?tf=256x",
          category: "Survival horror"
      },
      {
          id: 3,
          name: "Amnesia: The Dark Descent",
          description: "Un castillo tenebroso, amnesia y un terror que te persigue a cada paso.",
          image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
          category: "Terror psicológico"
      },
      {
          id: 4,
          name: "Outlast",
          description: "Un periodista se adentra en un manicomio abandonado para descubrir la verdad.",
          image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
          category: "Survival horror"
      },
      {
          id: 5,
          name: "Dead Space",
          image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
          description: "Terror espacial en una nave infestada por criaturas necromórficas.",
          category: "Scifi horror"
      },
      {
          id: 6,
          name: "P.T.",
          description: "Una demo jugable corta pero terrorífica creada por Hideo Kojima.",
          image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
          category: "Terror psicológico"
      },
      {
          id: 7,
          name: "Little Nightmares",
          description: "Un viaje oscuro y macabro a través de un mundo retorcido.",
          image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
          category: "Terror atmosférico"
      },
      {
          id: 8,
          name: "Alien: Isolation",
          description: "Sobrevive a la persecución de un xenomorfo en una estación espacial.",
          image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
          category: "Sci-fi horror"
      },
      {
          id: 9,
          name: "Visage",
          description: "Explora una casa maldita que te atormenta con visiones y horrores.",
          image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
          category: "Terror psicológico"
      },
      {
          id: 10,
          name: "The Evil Within",
          description: "Un detective se adentra en un mundo de pesadilla creado por una mente criminal.",
          image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
          category: "Survival horror"
      },
      {
        id: 11,
        name: "Alan Wake",
        description: "Un escritor de terror se ve atrapado en un pueblo donde la oscuridad cobra vida.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Terror psicológico"
    },
    {
        id: 12,
        name: "Layers of Fear",
        description: "Explora una mansión llena de pesadillas y descubre los secretos de un pintor perturbado.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Terror psicológico"
    },
    {
        id: 13,
        name: "SOMA",
        description: "Sobrevive en una estación submarina abandonada y descubre los horrores de la inteligencia artificial.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Sci-fi horror"
    },
    {
        id: 14,
        name: "Five Nights at Freddy's",
        description: "Trabaja como guardia de seguridad en una pizzería embrujada por animatrónicos asesinos.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Jump scares"
    },
    {
        id: 15,
        name: "The Forest",
        description: "Sobrevive en una isla caníbal tras un accidente aéreo.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Survival horror"
    },
    {
        id: 16,
        name: "Bloodborne",
        description: "Caza monstruos en un mundo gótico lleno de horrores.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Action RPG"
    },
    {
        id: 17,
        name: "Doki Doki Literature Club!",
        description: "Un juego de simulación de citas que se torna en una pesadilla psicológicamente perturbadora.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Terror psicológico"
    },
    {
        id: 18,
        name: "Darkwood",
        description: "Explora un bosque oscuro y siniestro en un mundo post-apocalíptico.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Survival horror"
    },
    {
        id: 19,
        name: "Bendy and the Ink Machine",
        description: "Un estudio de animación abandonado esconde oscuros secretos y criaturas de tinta.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Terror psicológico"
    },
    {
        id: 20,
        name: "Phasmophobia",
        description: "Investiga lugares embrujados con tus amigos en este juego cooperativo.",
        image: "https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360",
        category: "Terror cooperativo"
    }
  ]

}
