import { Download, FileText, Link as LinkIcon, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui'

const ResourceList = ({ resources = [] }) => {
    const resolved = resources.length
        ? resources
        : [
            { type: 'pdf', title: 'Workbook - Exemple.pdf', size: '2.4 MB' },
            { type: 'link', title: 'Outil - Exemple', size: 'Externe', url: '#' },
            { type: 'file', title: 'Template - Exemple.docx', size: '156 KB' }
        ]

    const getIcon = (type) => {
        switch (type) {
            case 'link': return LinkIcon
            case 'pdf': return FileText
            default: return Download
        }
    }

    return (
        <Card className="bg-bg-card/50">
            <h3 className="text-lg font-bold text-text-primary mb-4">Ressources du module</h3>
            <div className="space-y-3">
                {resolved.map((resource, index) => {
                    const Icon = getIcon(resource.type)
                    const isLink = resource.type === 'link'
                    const href = resource.url || '#'
                    return (
                        <a
                            key={index}
                            href={href}
                            target={isLink ? '_blank' : undefined}
                            rel={isLink ? 'noreferrer' : undefined}
                            className="flex items-center justify-between p-3 rounded-lg border border-border-primary bg-bg-card hover:bg-bg-card-hover hover:border-border-primary transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-text-secondary/10 flex items-center justify-center text-text-secondary group-hover:text-cyan group-hover:bg-cyan/10 transition-colors">
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-text-primary group-hover:text-cyan transition-colors">
                                        {resource.title}
                                    </p>
                                    <p className="text-xs text-text-secondary">
                                        {resource.size}
                                    </p>
                                </div>
                            </div>
                            {isLink ? (
                                <ExternalLink size={18} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                            ) : (
                                <Download size={18} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                            )}
                        </a>
                    )
                })}
            </div>
        </Card>
    )
}

export default ResourceList
