import MaxContainer from "../common/maxcontainer";

const Features = () => {

    return (
        <section
            className="sm:px-[7rem] px-[2.5rem]"
        >

            <MaxContainer
                className="mt-[10rem]"
            >
                <h2 className="font-[400] text-[2.6rem] text-white">Features</h2>

                <div className="grid sm:grid-cols-2 gap-[2rem] sm:mt-[3rem] sm:gap-[3rem]">
                    <EnterpriseCollaboration />
                    <PeriodicOnchainStatement />
                    <MultiChainSupport />
                </div>
            </MaxContainer>
        </section>
    );
}

interface Feature {
    icons?: React.ReactNode;
    title?: string | React.ReactNode;
    pargragh?: string;
    classNames?: string;
}

const EnterpriseCollaboration = () => {
    return (
        <div className="rounded-[2rem] bg-[url(/common/card-bg.png)] px-[3rem] py-[2.5rem]">
            <img
                src="/common/enterprise-collaboration.svg"
                alt="enterprise-collaboration"
                className="size-[38rem] mx-auto"
            />
            <FeatureContent
                title="Enterprise Collaboration"
                pargragh="Share wallet analytics and reports across your team.Collaborate on portfolio tracking, enable multi-user workspaces & maintain unified visibility across organizational wallets."
                classNames="max-w-[39rem] mt-[4rem]"
            />
        </div>
    )
}

const PeriodicOnchainStatement = () => {
    return (
        <div className="rounded-[2rem] bg-[url(/common/card-bg.png)] px-[3rem] pb-[2.5rem]">
            <img
                src="/common/periodic-onchain-statement.png"
                alt="periodic-onchain-statement"
                className="h-[38rem] mx-auto"
            />
            <FeatureContent
                title="Periodic Onchain Statement"
                pargragh="Monthly reports summarizing your onchain activity, including DEX/CEX volumes, transaction statistics, chains & protocols interacted with, gas spent, & key portfolio metrics. "
                classNames="max-w-[34rem] mt-[4rem]"
            />
        </div>
    )
}

const MultiChainSupport = () => {
    return (
        <div className="flex items-center col-span-2 bg-[url(/common/card-bg.png)] bg-no-repeat bg-[length:100%_100%] rounded-[3rem] justify-between border px-[3rem]">
            <FeatureContent
                title="Multi-Chain Support"
                pargragh="Track and analyze wallet activity across multiple blockchains from a single dashboard. "
                classNames=""
            />

            <img src="/common/multi-chain-support.svg" alt="multi-chain-support" className="size-[61rem]" />
        </div>
    )
}

const FeatureContent = ({ title, pargragh, classNames = "" }: Feature) => {
    return (
        <div className={classNames}>
            <h3 className="text-[#FFFFFF] text-[2rem] font-[400]">{title}</h3>
            <p className="text-[#7C8E97] text-[1.3rem] mt-[.4rem] font-[400]">{pargragh}</p>
        </div>
    )
}

export default Features;
