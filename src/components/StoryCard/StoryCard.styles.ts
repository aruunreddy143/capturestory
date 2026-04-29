import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    /* CARD */

    card: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
        marginVertical: 8,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.25,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
            },
            android: {
                elevation: 4,
            },
        }),
    },

    /* FEATURED CARD */

    cardFeatured: {
        elevation: 6,
    },

    /* COMPACT CARD */

    cardCompact: {
        flexDirection: 'row',
    },

    /* COVER */

    cover: {
        height: 160,
        padding: 16,
        justifyContent: 'flex-end',
        position: 'relative',
    },

    coverFeatured: {
        height: 200,
    },

    coverCompact: {
        height: 120,
    },

    /* MEDIA BADGE */

    mediaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    mediaText: {
        color: '#fff',
        marginLeft: 4,
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
    },

    /* DURATION BADGE */

    duration: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    durationText: {
        color: '#fff',
        marginLeft: 4,
        fontSize: 11,
    },

    /* DRAFT BADGE */

    draftBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: 'rgba(245,87,108,0.9)',
    },

    draftText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
    },

    /* BODY */

    body: {
        padding: 20,
    },

    category: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#667eea',
        marginBottom: 6,
        letterSpacing: 1,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
        lineHeight: 22,
    },

    titleCompact: {
        fontSize: 15,
    },

    excerpt: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 20,
        marginBottom: 12,
    },

    /* FOOTER */

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    stats: {
        flexDirection: 'row',
        gap: 14,
    },

    stat: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    statText: {
        marginLeft: 4,
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
    },

    date: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.35)',
    },
});
