'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient' // 또는 '@/lib/supabaseClient' 도 가능

export default function Home() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('users').select('*')
      if (error) console.error('❌ Supabase error:', error)
      else setUsers(data || [])
    }
    fetchData()
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">✅ Madyu Connected to Supabase!</h1>
      <p className="mb-4">현재 users 테이블의 데이터 :</p>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(users, null, 2)}</pre>
    </main>
  )
}

