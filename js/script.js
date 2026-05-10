const BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Replace with your Telegram Bot Token
const CHAT_ID = 'YOUR_CHAT_ID'; // Replace with your Telegram Chat ID

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = form.elements['name'].value;
        const email = form.elements['email'].value;
        const message = form.elements['message'].value;

        if (!name || !email || !message) {
            errorMessage.textContent = 'All fields are required.';
            errorMessage.classList.remove('hidden');
            return;
        }

        const telegramMessage = `
📩 New Contact Message
👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${message}
        `;

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: telegramMessage,
                }),
            });

            if (response.ok) {
                successMessage.textContent = 'Message sent successfully!';
                successMessage.classList.remove('hidden');
                form.reset();
                errorMessage.classList.add('hidden');
            } else {
                throw new Error('Failed to send message.');
            }
        } catch (error) {
            errorMessage.textContent = 'Error sending message. Please try again later.';
            errorMessage.classList.remove('hidden');
        }
    });
});