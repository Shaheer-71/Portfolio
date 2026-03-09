/**
 * Send a WhatsApp notification via CallMeBot (free, no Twilio needed).
 * Setup: https://www.callmebot.com/blog/free-api-whatsapp-messages/
 */
export async function sendWhatsAppMessage(text) {
  const phone  = process.env.WHATSAPP_PHONE   // international format, no +  e.g. 966536250307
  const apiKey = process.env.WHATSAPP_API_KEY

  if (!phone || !apiKey) return // silently skip if not configured

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apiKey}`

  const res = await fetch(url)
  if (!res.ok) {
    console.error('[WhatsApp] Notification failed:', res.status, await res.text())
  }
}
