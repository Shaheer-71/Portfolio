/**
 * Sends an HTML-formatted message via Telegram Bot API.
 * Silently skips if TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured.
 */
export async function sendTelegramMessage(text) {
  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = process.env
  if (!token || !chatId) return

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    })
    if (!res.ok) console.error('[Telegram] Failed:', await res.text())
  } catch (err) {
    console.error('[Telegram] Error:', err.message)
  }
}
