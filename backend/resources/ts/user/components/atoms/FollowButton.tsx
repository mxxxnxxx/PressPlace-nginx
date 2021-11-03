import { Button } from "@material-ui/core"
import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

type Props = {
    loginUserId?: number
    targetUser?: number
    followButton?: boolean
    follow: (userId?: number) => Promise<void>
    unFollow: (userId?: number) => Promise<void>
}
const FollowButton: React.FC<Props> = ({
    loginUserId,
    followButton,
    follow,
    unFollow,
    targetUser
}) => {
    return (
        <>
            {/* 条件分岐 */}
            {followButton == undefined || loginUserId == targetUser && <></>}
            {
                followButton == false && !(loginUserId == targetUser) &&
                <Button
                    // startIcon={}
                    onClick={() => follow(targetUser)}
                    variant="outlined"
                    size='small'
                    startIcon={<AddIcon />}
                >
                    フォロー
                </Button>
            }


            {
                followButton == true && !(loginUserId == targetUser) &&
                <Button
                    // startIcon={}
                    onClick={() => unFollow(targetUser)}
                    variant="outlined"
                    size='small'
                    startIcon={<RemoveIcon />}
                >
                    フォロー解除
                </Button>
            }
        </>

    )
}
export default FollowButton
