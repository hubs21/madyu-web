"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function FeedPage() {
  const [loading, setLoading] = useState(false);

  const cards = [
    {
      id: "1",
      title: "🎯 첫 번째 코칭 카드",
      content: "윤준님, 오늘의 목표는 '브랜드 프로필 완성'입니다. 하단 버튼을 AI와 함께 시작하세요.",
    },
    {
      id: "2",
      title: "📈 성장 인사이트",
      content:
        "최근 활동 데이터에 따르면, 윤준님의 시장 활동 점수는 평균보다 15% 상승했습니다. 계속해서 MGI가 +3.5점을 유지 중입니다.",
    },
    {
      id: "3",
      title: "💬 피드백 요청",
      content: "AI가 새로운 '스타일 분석' 기능을 테스트 중이에요. 직접 피드백을 남겨주세요.",
    },
  ];

  async function sendFeedback(cardId: string, feedbackType: string) {
    setLoading(true);
    const { error } = await supabase.from("feedbacks").insert([
      {
        card_id: cardId,
        feedback_type: feedbackType,
      },
    ]);
    setLoading(false);

    if (error) {
      console.error("피드백 저장 오류:", error.message);
      alert("⚠️ 피드백 저장 중 오류가 발생했습니다.");
    } else {
      alert("✅ 피드백이 저장되었습니다. 감사합니다!");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7FF] p-8">
      <h1 className="text-3xl font-bold text-[#3B5BDB] mb-6">
        Madyu AI 코디네이션
      </h1>

      <div className="space-y-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-[#1E293B] mb-2">
              {card.title}
            </h2>
            <p className="text-[#475569] mb-4 leading-relaxed">
              {card.content}
            </p>

            <div className="flex gap-3">
              <button
                disabled={loading}
                onClick={() => sendFeedback(card.id, "positive")}
                className="px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
              >
                👍 좋아요
              </button>
              <button
                disabled={loading}
                onClick={() => sendFeedback(card.id, "neutral")}
                className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              >
                🤔 개선 필요
              </button>
              <button
                disabled={loading}
                onClick={() => sendFeedback(card.id, "negative")}
                className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
              >
                👎 별로예요
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
