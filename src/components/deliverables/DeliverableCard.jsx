import { Card, Badge, Button } from '@/components/ui'
import { Eye, FileText, Upload, MessageSquare, AlertCircle, Clock, CheckCircle2 } from 'lucide-react'

const DeliverableCard = ({ deliverable }) => {
    return (
        <Card className="group border border-white/5 hover:border-white/10 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {/* Left Side: Status Icon & Info */}
                <div className="flex gap-4">
                    <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center shrink-0
            ${deliverable.status === 'validated' ? 'bg-green-500/10 text-green-500' :
                            deliverable.status === 'to_rework' ? 'bg-orange-500/10 text-orange-500' :
                                'bg-blue-500/10 text-blue-500'}
          `}>
                        {deliverable.status === 'validated' ? <CheckCircle2 size={24} /> :
                            deliverable.status === 'to_rework' ? <AlertCircle size={24} /> :
                                <Clock size={24} />}
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                                MODULE {deliverable.moduleNumber} • FONDATIONS
                            </span>
                            <Badge status={deliverable.status}>
                                {deliverable.status === 'validated' ? 'Validé' :
                                    deliverable.status === 'to_rework' ? 'À retravailler' :
                                        'En attente'}
                            </Badge>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">
                            {deliverable.title}
                        </h3>

                        <p className="text-sm text-text-secondary mb-1">
                            {deliverable.type}
                        </p>
                        <p className="text-xs text-text-secondary/60">
                            Envoyé le {deliverable.date}
                        </p>
                    </div>
                </div>

                {/* Right Side: Actions */}
                {deliverable.status === 'to_rework' && (
                    <Button size="sm" className="shadow-none bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20 w-full md:w-auto text-center">
                        <Upload size={16} className="mr-2" />
                        Renvoyer une version
                    </Button>
                )}
            </div>

            {/* Feedback Section */}
            {deliverable.feedback && (
                <div className="mt-6 bg-white/5 rounded-lg p-4 border-l-2 border-cyan">
                    <div className="flex gap-3">
                        <MessageSquare size={18} className="text-cyan mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-white mb-1">Dernier feedback</p>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {deliverable.feedback}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Actions */}
            <div className="mt-6 pt-4 border-t border-white/5 flex gap-3">
                <Button variant="ghost" size="sm" className="text-text-secondary hover:text-white">
                    <Eye size={16} className="mr-2" />
                    Voir le feedback
                </Button>
                <Button variant="ghost" size="sm" className="text-text-secondary hover:text-white">
                    <FileText size={16} className="mr-2" />
                    Voir le livrable
                </Button>
            </div>
        </Card>
    )
}

export default DeliverableCard
