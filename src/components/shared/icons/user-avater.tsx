const UserAvatar = ({
    initial
}: {
    initial: string;
}) => {
    return (
        <div className="rounded-full grid shrink-0 place-content-center size-[3rem] bg-[#35505F]">
            <div className="rounded-full grid place-content-center size-[2.7rem] bg-[#172329]">
                <div className="rounded-full grid place-content-center size-[2.3rem] bg-[#35505F]" >
                    <h1 className="text-center capitalize font-medium text-[1.3rem] text-white">{initial}</h1>
                </div>
            </div>
        </div>
    );
}

export default UserAvatar;