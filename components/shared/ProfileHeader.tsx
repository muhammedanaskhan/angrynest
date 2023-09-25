import Image from "next/image";
import FollowUser from "../atoms/FollowUser";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    isFollowing?: boolean;
}

const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    isFollowing
}: Props) => {

    return (
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-20 w-20 object-cover">
                        <Image src={imgUrl} alt="profile_image" fill className="rounded-full object-cover shadow-2xl" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-left text-heading1-bold text-dark">{name}</h2>
                        <p className="text-base-medium text-gray-1">@{username}</p>
                    </div>
                </div>
                {accountId !== authUserId && (
                    <FollowUser
                        userId={accountId}
                        currentUserId={authUserId}
                        isFollowing={isFollowing}
                    />
                )}
            </div>

            <p className="mt-6 max-w-lg text-base-regular text-gray-500">{bio}</p>
            <div className="mt-12 h-0.5 w-full bg-zinc-500"></div>

        </div>
    )
}

export default ProfileHeader;