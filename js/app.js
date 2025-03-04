const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnLangosta = document.querySelector('.langosta');
const btnFuertes = document.querySelector('.fuertes');
const btnCeviches = document.querySelector('.ceviches');
const btnVarios = document.querySelector('.varios');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');

document.addEventListener('DOMContentLoaded', () => {
	eventos();
	platillos();
});

const eventos = () => {
	menu.addEventListener('click', abrirMenu);
	document.addEventListener('click', (e) => {
		if (!navegacion.contains(e.target) && !menu.contains(e.target)) {
			navegacion.classList.add('ocultar');
		}
	});
};

const abrirMenu = () => {
	navegacion.classList.remove('ocultar');
	botonCerrar();
};

const botonCerrar = () => {
	const btnCerrar = document.createElement('p');
	const overlay = document.createElement('div');
	overlay.classList.add('pantalla-completa');
	const body = document.querySelector('body');
	if (document.querySelectorAll('.pantalla-completa').length > 0) return;
	body.appendChild(overlay);
	btnCerrar.textContent = 'x';
	btnCerrar.classList.add('btn-cerrar');

	// while(navegacion.children[5]){
	//     navegacion.removeChild(navegacion.children[5]);
	// }
	navegacion.appendChild(btnCerrar);
	cerrarMenu(btnCerrar, overlay);
};

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const imagen = entry.target;
			imagen.src = imagen.dataset.src;
			observer.unobserve(imagen);
		}
	});
});

imagenes.forEach((imagen) => {
	observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) => {
	boton.addEventListener('click', () => {
		navegacion.classList.add('ocultar');
		overlay.remove();
		boton.remove();
	});

	overlay.onclick = function () {
		overlay.remove();
		navegacion.classList.add('ocultar');
		boton.remove();
	};
};

const platillos = () => {
	let platillosArreglo = [];
	const platillos = document.querySelectorAll('.platillo');

	platillos.forEach(
		(platillo) => (platillosArreglo = [...platillosArreglo, platillo]),
	);

	const langosta = platillosArreglo.filter(
		(langosta) => langosta.getAttribute('data-platillo') === 'langosta',
	);
	const fuertes = platillosArreglo.filter(
		(fuertes) => fuertes.getAttribute('data-platillo') === 'fuertes',
	);
	const ceviches = platillosArreglo.filter(
		(ceviches) => ceviches.getAttribute('data-platillo') === 'ceviches',
	);
	const varios = platillosArreglo.filter(
		(varios) => varios.getAttribute('data-platillo') === 'varios',
	);
	const postres = platillosArreglo.filter(
		(postres) => postres.getAttribute('data-platillo') === 'postres',
	);

	mostrarPlatillos(
		langosta,
		fuertes,
		ceviches,
		varios,
		postres,
		platillosArreglo,
	);
};

const mostrarPlatillos = (
	langosta,
	fuertes,
	ceviches,
	varios,
	postres,
	todos,
) => {
	btnLangosta.addEventListener('click', () => {
		limpiarHtml(contenedorPlatillos);
		langosta.forEach((langosta) => contenedorPlatillos.appendChild(langosta));
	});

	btnFuertes.addEventListener('click', () => {
		limpiarHtml(contenedorPlatillos);
		fuertes.forEach((fuertes) => contenedorPlatillos.appendChild(fuertes));
	});

	btnCeviches.addEventListener('click', () => {
		limpiarHtml(contenedorPlatillos);
		ceviches.forEach((ceviches) => contenedorPlatillos.appendChild(ceviches));
	});
	btnVarios.addEventListener('click', () => {
		limpiarHtml(contenedorPlatillos);
		varios.forEach((varios) => contenedorPlatillos.appendChild(varios));
	});
	btnPostres.addEventListener('click', () => {
		limpiarHtml(contenedorPlatillos);
		postres.forEach((postres) => contenedorPlatillos.appendChild(postres));
	});
	btnTodos.addEventListener('click', () => {
		limpiarHtml(contenedorPlatillos);
		todos.forEach((todo) => contenedorPlatillos.appendChild(todo));
	});
};

const limpiarHtml = (contenedor) => {
	while (contenedor.firstChild) {
		contenedor.removeChild(contenedor.firstChild);
	}
};

// Inicializa EmailJS con tu User ID
emailjs.init('service_o9tn1c9');

document
	.getElementById('contacto')
	.addEventListener('submit', function (event) {
		event.preventDefault();

		// 🔹 Usamos tu Service ID y Template ID
		emailjs.sendForm('servicio_o9tn1c9', 'template_x72ulti', this).then(
			function () {
				alert('¡Mensaje enviado con éxito! Te responderemos pronto.');
				document.getElementById('contacto').reset();
			},
			function (error) {
				alert('Hubo un error: ' + JSON.stringify(error));
			},
		);
	});

document
	.getElementById('contacto')
	.addEventListener('submit', function (event) {
		event.preventDefault();
		const nombre = document.getElementById('nombre').value;
		const apellidos = document.getElementById('apellidos').value;
		const correo = document.getElementById('correo').value;
		const telefono = document.getElementById('telefono').value;
		const mensaje = document.getElementById('mensaje').value;

		if (nombre && apellidos && correo && telefono && mensaje) {
			alert(
				'Gracias, ' + nombre + '! Tu mensaje ha sido enviado correctamente.',
			);
			document.getElementById('contacto').reset();
		} else {
			alert(
				'Por favor completa todos los campos antes de enviar el formulario.',
			);
		}
	});
