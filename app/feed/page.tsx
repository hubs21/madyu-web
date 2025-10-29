"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import FeedbackButtons from "../components/FeedbackButtons";

export default function FeedPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 카드 불러오기 함수
  const fetchCards = async () => {
    // ✅ 로그인 생략하고 userId 강제 지정 (테스트용)
    const userId = "d4642595-4183-4491-a5b1-2ecb21237c9a"; // 🔸 Supabase users 테이블에서 실제 ID 복사

    const { data, error } = await supabase
      .from("coaching_cards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("카드 로드 오류:", error.message);
    } else {
      setCards(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <div className="text-lg font-semibold">🔄 코칭 카드를 불러오는 중...</div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <div className="text-2xl font-semibold mb-2">💡 아직 카드가 없습니다.</div>
        <div className="text-gray-500">Madyu AI가 첫 번째 코칭 카드를 준비 중이에요.</div>
      </div>
    );
  }

  // ✅ 최근 카드 4개까지만 표시
  const limitedCards = cards.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      <h1 className="text-3xl font-extrabold text-[#0066FF] mb-8 text-center">
        Madyu AI 코칭 피드
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {limitedCards.map((card) => (
          <div
            key={card.id}
            className="p-6 rounded-2xl shadow-md border border-gray-100 bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h2>
            <p className="text-gray-600 mb-4 whitespace-pre-line">{card.content}</p>

            {/* 👍 피드백 버튼 */}
            <FeedbackButtons userId={card.user_id} cardId={card.id} />

            {card.action_url && (
              <a href={card.action_url}>
                <button className="mt-4 bg-[#0066FF] text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-600">
                  바로가기
                </button>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

