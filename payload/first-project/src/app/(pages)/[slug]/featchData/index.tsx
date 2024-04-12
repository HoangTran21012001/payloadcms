'use client'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const fetchData : React.FC = () => {
  
  const searchParams = useSearchParams()
  const query = searchParams.get("id");
  console.log(query);
  
  return (
    <form>
        <button>hello</button>
    </form>

  )
}

export default fetchData