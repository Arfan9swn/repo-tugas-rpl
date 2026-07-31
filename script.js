document.addEventListener('DOMContentLoaded', ()=>{
	const form = document.getElementById('contact-form');
	if(!form) return;
	form.addEventListener('submit', e => {
		e.preventDefault();
		const fd = new FormData(form);
		const name = fd.get('name') || 'there';
		alert(`Thanks ${name}! Your message was sent.`);
		form.reset();
	});
});
