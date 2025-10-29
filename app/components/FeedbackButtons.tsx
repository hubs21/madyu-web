'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function FeedbackButtons({ userId, cardId }: { userId: string; cardId: string }) {
  const [sending, setSending] = useState(false)

  const sendFeedback = async (type: 'good' | 'neutral' | 'bad') => {
    setSending(true)
    const { error } = await supabase
      .from('feedbacks')
      .insert([{ user_id: userId, card_id: cardId, feedback_type: type }])
    if (error) {
      console.error('❌ 피드백 저장 오류:', error.message)
      alert('⚠️ 피드백 저장 중 오류가 발생했습니다.')
    } else {
      alert('✅ 피드백이 저장되었습니다.')
    }
    setSending(false)
  }

  return (
    <div className="flex gap-3 mt-3">
      <button disabled={sending} onClick={() => sendFeedback('good')} className="px-3 py-1 rounded-xl bg-green-500 text-white hover:bg-green-600">👍 좋아요</button>
      <button disabled={sending} onClick={() => sendFeedback('neutral')} className="px-3 py-1 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600">🤔 보통이에요</button>
      <button disabled={sending} onClick={() => sendFeedback('bad')} className="px-3 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600">👎 별로예요</button>
    </div>
  )
}


