import React, { useEffect } from 'react'
import ReactDOM from "react-dom"
import Creator from '../../components/pages/Creator'
import typescriptLogo from '/work/backend/public/logos/typescriptLogo.png'
import DockerComposeLogo from '/work/backend/public/logos/Docker-ComposeLogo.png'
import dockerLogo from '/work/backend/public/logos/dockerLogo.png'
import awsLogo from '/work/backend/public/logos/awsLogo.png'
import laravelLogo from '/work/backend/public/logos/laravelLogo.png'
import phpLogo from '/work/backend/public/logos/phpLogo.png'
import ReactLogo from '/work/backend/public/logos/ReactLogo.png'
import javascriptLogo from '/work/backend/public/logos/javascriptLogo.png'
import gitLogo from '/work/backend/public/logos/GitLogo.png'
import gitHubLogo from '/work/backend/public/logos/GitHubLogo.png'
import nodeJsLogo from '/work/backend/public/logos/nodeJsLogo.png'
import LibraryLogo from '/work/backend/public/logos/LibraryLogo.png'
import EC2Logo from '/work/backend/public/logos/EC2Logo.png'
import S3Logo from '/work/backend/public/logos/S3Logo.png'
import cloud9Logo from '/work/backend/public/logos/cloud9Logo.png'
import vpcLogo from '/work/backend/public/logos/vpcLogo.png'

const EnhancedCreator: React.FC = () => {
    // js関係
    const react = {
        name: 'React',
        logo: ReactLogo,
        skill: [
            'React Hook',
            'React Hook Form',
            'React Query',
            'Material UI'
        ]
    }
    const TypeScript = {
        name: 'TypeScript',
        logo: typescriptLogo,
    }

    const JavaScript = {
        name: 'JavaScript',
        logo: javascriptLogo,
        skill: [
            react,
            TypeScript,
        ]
    }

    // php関係

    const laravel = {
        name: 'Laravel',
        logo: laravelLogo,
        skill: [
            'Laravel Mix',
            'Laravel Debugbar'
        ]
    }
    const php = {
        name: 'PHP',
        logo: phpLogo,
        skill: [
            laravel
        ]
    }
    // docker関係
    const DockerCompose = {
        name: 'Docker Compose',
        logo: DockerComposeLogo
    }
    const docker = {
        name: 'docker',
        logo: dockerLogo,
        skill: [
            DockerCompose
        ]
    }

    // aws関係
    const EC2 = {
        name: 'EC2',
        logo: EC2Logo,
    }
    const VPC = {
        name: 'VPC',
        logo: vpcLogo,
    }
    const S3 = {
        name: 'S3',
        logo: S3Logo,
    }
    const aws = {
        name: 'aws',
        logo: awsLogo,
        skill: [
            EC2,
            VPC,
            S3
        ]
    }
    // git関係
    const gitHub = {
        name: 'gitHub',
        logo: gitHubLogo,
    }

    const git = {
        name: 'git',
        logo: gitLogo,
        skill: [
            gitHub
        ]

    }
    const skillSet = [
        JavaScript,
        php,
        docker,
        aws,
        git
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Creator
            skillSet={skillSet}
        />
    )
}
export default EnhancedCreator
