import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { postId, action } = body

        if (!postId) {
            return NextResponse.json({ error: 'postId gerekli' }, { status: 400 })
        }

        // Get current post
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { likes: true }
        })

        if (!post) {
            return NextResponse.json({ error: 'Post bulunamadı' }, { status: 404 })
        }

        // Calculate new likes count
        let newLikes = post.likes || 0
        if (action === 'like') {
            newLikes += 1
        } else if (action === 'unlike') {
            newLikes = Math.max(0, newLikes - 1)
        } else {
            return NextResponse.json({ error: 'Geçersiz action (like/unlike)' }, { status: 400 })
        }

        // Update likes
        const updated = await prisma.post.update({
            where: { id: postId },
            data: { likes: newLikes },
            select: { id: true, likes: true }
        })

        return NextResponse.json({
            success: true,
            likes: updated.likes
        })
    } catch (error) {
        console.error('Like error:', error)
        return NextResponse.json({ error: 'Beğeni işlemi başarısız' }, { status: 500 })
    }
}

// Get likes count for a post
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (!postId) {
        return NextResponse.json({ error: 'postId gerekli' }, { status: 400 })
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { likes: true }
        })

        if (!post) {
            return NextResponse.json({ error: 'Post bulunamadı' }, { status: 404 })
        }

        return NextResponse.json({ likes: post.likes || 0 })
    } catch (error) {
        console.error('Get likes error:', error)
        return NextResponse.json({ error: 'Beğeni sayısı alınamadı' }, { status: 500 })
    }
}
