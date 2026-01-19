'use client'

import { useState, useEffect, useCallback } from 'react'
import { Heart, Share2, Check, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Tag {
    name: string
    slug?: string
}

interface PostEngagementProps {
    postId?: string
    tags?: Tag[] | string[]
    locale?: string
    shareUrl?: string
    shareTitle?: string
    initialLikes?: number
}

// LocalStorage key for tracking which posts user has liked
const LIKED_POSTS_KEY = 'tarf_liked_posts'

function getLikedPosts(): string[] {
    if (typeof window === 'undefined') return []
    try {
        const stored = localStorage.getItem(LIKED_POSTS_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

function setLikedPosts(posts: string[]) {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(posts))
    } catch {
        // Ignore storage errors
    }
}

export function PostEngagement({
    postId,
    tags = [],
    locale = 'tr',
    shareUrl,
    shareTitle,
    initialLikes = 0,
}: PostEngagementProps) {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(initialLikes)
    const [shared, setShared] = useState(false)
    const [loading, setLoading] = useState(false)

    // Check if user has already liked this post (from localStorage)
    useEffect(() => {
        if (postId) {
            const likedPosts = getLikedPosts()
            setLiked(likedPosts.includes(postId))
        }
    }, [postId])

    const handleLike = useCallback(async () => {
        if (!postId || loading) return

        const newLikedState = !liked
        setLoading(true)

        try {
            const res = await fetch('/api/posts/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postId,
                    action: newLikedState ? 'like' : 'unlike'
                })
            })

            if (res.ok) {
                const data = await res.json()
                setLikes(data.likes)
                setLiked(newLikedState)

                // Update localStorage
                const likedPosts = getLikedPosts()
                if (newLikedState) {
                    if (!likedPosts.includes(postId)) {
                        setLikedPosts([...likedPosts, postId])
                    }
                } else {
                    setLikedPosts(likedPosts.filter(id => id !== postId))
                }
            }
        } catch (error) {
            console.error('Like error:', error)
        } finally {
            setLoading(false)
        }
    }, [postId, liked, loading])

    const handleShare = async () => {
        const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '')
        const title = shareTitle || document.title

        if (navigator.share) {
            try {
                await navigator.share({ title, url })
                setShared(true)
                setTimeout(() => setShared(false), 2000)
            } catch {
                // User cancelled
            }
        } else {
            await navigator.clipboard.writeText(url)
            setShared(true)
            setTimeout(() => setShared(false), 2000)
        }
    }

    const normalizedTags = tags
        .map((tag) =>
            typeof tag === 'string' ? { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') } : tag
        )
        .filter((tag) => tag.name && tag.name.trim().length > 0)

    return (
        <div className="space-y-6">
            {/* Tags */}
            {normalizedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {normalizedTags.map((tag, index) => (
                        <motion.span
                            key={tag.slug || index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200 hover:text-slate-900 cursor-pointer group"
                        >
                            <span className="text-slate-400 group-hover:text-primary transition-colors">#</span>
                            {tag.name}
                        </motion.span>
                    ))}
                </div>
            )}

            {/* Engagement Actions */}
            <div className="flex items-center gap-2">
                {/* Like Button */}
                <motion.button
                    type="button"
                    onClick={handleLike}
                    disabled={!postId || loading}
                    whileTap={{ scale: 0.9 }}
                    className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${liked
                            ? 'bg-red-50 text-red-600'
                            : 'bg-white/60 text-slate-600 hover:bg-white hover:text-red-500'
                        } border border-white/40 backdrop-blur-sm shadow-sm disabled:opacity-50`}
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Loader2 className="h-5 w-5 animate-spin" />
                            </motion.div>
                        ) : liked ? (
                            <motion.div
                                key="filled"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                            >
                                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="outline"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={likes}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="min-w-[1.5ch]"
                        >
                            {likes}
                        </motion.span>
                    </AnimatePresence>
                    <span className="hidden sm:inline">
                        {locale === 'tr' ? 'Beğen' : 'Like'}
                    </span>
                </motion.button>

                {/* Share Button */}
                <motion.button
                    type="button"
                    onClick={handleShare}
                    whileTap={{ scale: 0.95 }}
                    className={`group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all border border-white/40 backdrop-blur-sm shadow-sm ${shared
                            ? 'bg-green-50 text-green-600'
                            : 'bg-white/60 text-slate-600 hover:bg-white hover:text-primary'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {shared ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                            >
                                <Check className="h-5 w-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="share"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Share2 className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <span>
                        {shared
                            ? locale === 'tr'
                                ? 'Kopyalandı!'
                                : 'Copied!'
                            : locale === 'tr'
                                ? 'Paylaş'
                                : 'Share'}
                    </span>
                </motion.button>
            </div>
        </div>
    )
}
