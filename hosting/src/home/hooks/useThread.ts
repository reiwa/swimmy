import { firestore } from 'firebase/app'
import { useEffect, useState } from 'react'
import { docData } from 'rxfire/firestore'
import { FEEDS } from '../../firestore/constants/collection'
import { Post } from '../../firestore/types/post'

export const useThread = (threadId: string): [Post | null, boolean] => {
  const [post, setPost] = useState<Post | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    setPost(null)

    const subscription = docData<Post>(
      firestore()
        .collection(FEEDS)
        .doc(threadId)
    ).subscribe(_post => {
      setPost(_post)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [threadId])

  return [post, loading]
}
