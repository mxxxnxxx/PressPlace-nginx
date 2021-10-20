import React, { useCallback, useState } from 'react'
import FollowButton from '../../components/atoms/FollowButton'
import { useCurrentUser } from '../../hooks'
import Follow from '../../hooks/useFollowUser'
import UnFollow from '../../hooks/useUnFollowUser'

// 使う親のcomponentからfollowButtonの初期値を決めるPropsをもらう
type Props = {
    followState?: boolean
    targetUser?: number
}
const EnhancedFollowButton: React.FC<Props> = ({
    followState,
    targetUser
}) => {
    // 以下はフォローボタンの状態undefinedはログイン前の状態
    const [followButton, setFollowButton] = useState(followState)
    const currentUser = useCurrentUser()

    const follow = useCallback(async (targetUser?: number) => {
        await Follow(targetUser)
        setFollowButton(true)
    }, [])

    const unFollow = useCallback(async (targetUser?: number) => {
        await UnFollow(targetUser)
        setFollowButton(false)
    }, [])

    return (
        <FollowButton
            loginUserId={currentUser?.id}
            followButton={followButton}
            follow={follow}
            unFollow={unFollow}
            targetUser={targetUser}
        />
    )
}

export default EnhancedFollowButton
