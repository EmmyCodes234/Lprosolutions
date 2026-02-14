import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, FileText, Award, CheckCircle, ChevronRight, Lock, Download, AlertCircle, ShieldCheck, Headphones, BookOpen, Menu, X, ChevronDown, LayoutDashboard, Globe, Settings, LogOut, Sparkles } from 'lucide-react';

// 1. THE NESTED COURSE DATA (Exact JSON provided)
const courseData = {
    courseTitle: "Infrastructure Governance: PPCC & World Bank ESF",
    modules: [
        {
            moduleId: 1,
            title: "Sustainable Development Risk Architecture",
            lessons: [
                {
                    id: "1.1",
                    type: "video",
                    title: "1.1 Executive Video Lesson",
                    duration: "7 mins",
                    content: "Watch the AI-narrated executive lesson on Liberia's rulebook for public money."
                },
                {
                    id: "1.2",
                    type: "reading",
                    title: "1.2 The Mitigation Hierarchy Deep Dive",
                    duration: "15 min read",
                    content: "**World Bank Mitigation Hierarchy**\nThe Mitigation Hierarchy is the procedural and substantive architecture that governs how Borrowers must identify, evaluate, and manage environmental and social risks throughout the project life cycle. It is not a suggestion but a mandatory sequence of management interventions designed to help Borrowers achieve good international practice (GIIP) and fulfill national and international obligations. Within the context of Liberian infrastructure, this hierarchy must be reflected in both the Environmental and Social Impact Assessment (ESIA) and the Environmental and Social Commitment Plan (ESCP), which form part of the legal agreement between the Borrower and the Bank.\n\n**I. The Four Pillars of the Hierarchy**\nThe hierarchy operates on a sequential basis: anticipation and avoidance must always be prioritized over minimization, which in turn takes precedence over mitigation and compensation.\n\n**1. Anticipate and Avoid**\nThe primary objective of any infrastructure assessment is to anticipate risks and avoid impacts before they occur.\n\n**Legal Mandate:** Borrowers must examine project alternatives during the assessment phase to identify ways of improving project selection, siting, planning, and design.\n**Application in Biodiversity (ESS6):** For instance, when dealing with natural habitats, a project should not be implemented unless there are no technically and financially feasible alternatives. If a project involves commercial agriculture or forestry, it must be located on land that is already converted or highly degraded to avoid natural habitat loss.\n**Cultural Heritage (ESS8):** Priority is always given to the avoidance of impacts on cultural heritage; if a project involves \"in situ\" cultural heritage, the Borrower must implement measures to avoid its disturbance.\n\n**2. Minimize or Reduce**\nWhere avoidance is not possible, the Borrower is legally required to minimize or reduce risks and impacts to acceptable levels.\n\n**Operational Control:** This involves modifying project footprints or using technologies that limit the scope of the damage.\n**Pollution Prevention (ESS3):** If a project generates air pollutants, the Borrower must implement technically and financially feasible options to minimize project-related air emissions, such as enhancing energy efficiency or selecting less-polluting fuels.\n**Traffic Safety (ESS4):** In road infrastructure, the Borrower must incorporate technically and financially feasible road safety measures into project design to minimize risks to road users and affected communities.\n\n**3. Mitigate**\nOnce risks have been minimized to the extent possible, the Borrower must mitigate any remaining impacts.\n\n**Definition of Mitigation:** Mitigation includes measures to assist affected parties to improve or at least restore their livelihoods.\n**Involuntary Resettlement (ESS5):** Unavoidable adverse impacts from land acquisition must be mitigated by providing timely compensation for loss of assets at replacement cost and assisting displaced persons in their efforts to improve or restore their standards of living.\n**Labor (ESS2):** OHS measures must be designed to include preventive and protective measures, such as the modification or substitution of hazardous substances.\n\n**4. Compensate or Offset**\nAs a final resort, where significant residual impacts remain, the Borrower must compensate for or offset them, provided it is technically and financially feasible.\n\n**Technical Feasibility:** This is based on whether the measures can be implemented with commercially available skills and equipment, taking into account local factors like infrastructure and security.\n**Financial Feasibility:** This considers the relative magnitude of the incremental cost compared to the project’s total investment and maintenance costs.\n**Biodiversity Offsets:** Offsets are measurable conservation outcomes designed to result in no net loss and preferably a net gain of biodiversity. This is specifically required for residual impacts on critical habitats.\n\n**II. Technical Instruments for Hierarchy Compliance**\nTo ensure the hierarchy is legally enforceable, it must be integrated into specific documents that the Borrower prepares and the World Bank monitors.\n\n**The Environmental and Social Commitment Plan (ESCP)**\nThe ESCP is the legal summary of material measures and actions required for the project to meet the ESSs.\n\n• It must specify a completion date for each action.\n• It must include a process for adaptive management, allowing for changes in the event of unforeseen circumstances.\n• The Borrower is legally prohibited from carrying out any project activity that may cause material adverse risks until the relevant plans or actions in the ESCP are completed.\n\n**Environmental and Social Management Plan (ESMP)**\nThe ESMP details the specific actions needed to implement the mitigation hierarchy.\n\n**Mitigation Section:** It must describe each measure with technical details, including designs and equipment descriptions.\n**Monitoring Section:** It identifies technical details for sampling locations, frequency of measurements, and thresholds that signal the need for corrective actions.\n**Integration:** For infrastructure projects involving contractors, the ESMP should be incorporated into the contract between the Borrower and the contractor, including monitoring and enforcement provisions.\n\n**III. Integration with the Liberia PPCC Act**\nFor infrastructure projects in Liberia, compliance with the World Bank Mitigation Hierarchy must be synchronized with the Public Procurement and Concessions Act (PPCA).\n\n**Bidding Documentation (Section 34):** Descriptions of procurement requirements must be in conformity with applicable environmental protection legislation and international standards.\n**Evaluation Criteria (Section 58):** When selecting the \"lowest evaluated responsive bid,\" the Procuring Entity is legally authorized to consider the acceptable impact on the environment.\n**Technical Specifications (Section 49):** For international competitive bidding, technical specifications must be based on international standards.\n**Concession Feasibility (Section 103):** The Inter-Ministerial Concessions Committee (IMCC) may require preliminary feasibility studies, which, under World Bank standards, would include the initial scoping for the mitigation hierarchy.\n**Contract Management (Section 121):** Every concession agreement must include reports to be submitted on a periodic basis and asset maintenance requirements, aligning with the \"Monitoring\" phase of the mitigation hierarchy.\n\n**IV. Real-World Compliance Steps for Infrastructure Projects**\nAs a legal practitioner, I advise the following steps to ensure a project remains compliant and avoids funding freezes:\n\n**Risk Classification:** The Bank will classify the project as High, Substantial, Moderate, or Low Risk. High and Substantial risk projects require the disclosure of environmental and social documentation prior to project appraisal.\n**Independent Assessment:** For High Risk or situatons where the Borrower has limited capacity, the Borrower must retain independent specialists to carry out the environmental and social assessment.\n**Gap Analysis:** If a project is already under construction when Bank support is sought, a gap analysis against the ESSs must be conducted to identify any additional studies or mitigation measures required.\n**Stakeholder Engagement (ESS10):** Stakeholder engagement must be an integral part of the assessment. The Borrower must develop a Stakeholder Engagement Plan (SEP) and disclose project information (purpose, nature, and potential risks) early enough to allow for meaningful consultation on project design.\n**Grievance Redress:** The Borrower must provide a grievance mechanism to receive and facilitate the resolution of concerns from project-affected parties. This must be proportionate to the risks and impacts of the project.\n**Contractor Management:** Borrowers must contractually require contractors to apply the relevant aspects of the ESCP, including appropriate non-compliance remedies.\n**Primary Supplier Due Diligence:** The assessment must extend to primary suppliers—those who provide goods or materials essential to the project’s core functions. If a significant risk of child labor or forced labor is identified in the supply chain, the Borrower must require the supplier to identify and remedy those risks.\n\n**Conclusion**\nThe World Bank Mitigation Hierarchy is a rigorous legal requirement that moves the project from a \"do no harm\" baseline to maximizing development gains. In the Liberian context, the PPCC Act provides the institutional framework—through Procurement Committees and the IMCC—to ensure that these international standards are reflected in the procurement and concessioning of vital infrastructure. Failure to diligently implement the measures identified in the ESCP or the ESMP constitutes a breach of the legal agreement and grants the Bank the right to apply remedies. Compliance is not merely a box-ticking exercise; it is the prerequisite for the legal validity of the project's capital flow."
                },
                {
                    id: "1.3",
                    type: "audio",
                    title: "1.3 How the Liberian Government Goes Shopping",
                    duration: "16:39 mins",
                    content: "Listen to the executive breakdown of stakeholder engagement and ESCP drafting.",
                    audioSrc: "/assets/module1audio.m4a"
                },
                {
                    id: "1.4",
                    type: "document",
                    title: "1.4 Standard Reference Guide",
                    duration: "Download",
                    content: "This Reference Guide Checklist is designed to synchronize the requirements of the World Bank Environmental and Social Framework (ESF) with the statutory mandates of the Liberia Public Procurement and Concessions Act (PPCA).\n\n**Phase I: Project Identification and Risk Classification**\nBefore any procurement activity or concession feasibility study commences.\n\n[ ] **Risk Classification:** Has the Bank classified the project as High, Substantial, Moderate, or Low Risk based on type, location, sensitivity, and scale?\n[ ] **Borrower Framework Assessment:** Has a gap analysis been performed between Liberian national law and the World Bank ESSs to determine if national systems can be utilized?\n[ ] **Institutional Structure:** Has the Procuring Entity established its Procurement Committee (per Section 26 of the PPCA) or, if a concession, an Entity Concession Committee (per Section 77)?\n[ ] **Stakeholder Identification:** Have project-affected parties and other interested parties been identified, specifically focusing on disadvantaged or vulnerable groups?\n\n**Phase II: Environmental and Social Assessment (ESA)**\nConducted in parallel with Preliminary Feasibility Studies (PPCA Section 103).\n\n[ ] **Mitigation Hierarchy Application:** Does the assessment follow the mandatory sequence: Anticipate/Avoid -> Minimize/Reduce -> Mitigate -> Compensate/Offset?\n[ ] **Baseline Data Collection:** Has current environmental and social baseline data been gathered at a level of detail sufficient to inform risk characterization?\n[ ] **Stakeholder Engagement Plan (SEP):** Has a draft SEP been disclosed as early as possible to allow for meaningful consultation on project design?\n[ ] **Specialized Instruments:** Based on the assessment, have required plans been drafted? (e.g., Resettlement Plan (ESS5), Biodiversity Management Plan (ESS6), or Cultural Heritage Management Plan (ESS8)).\n\n**Phase III: The Environmental and Social Commitment Plan (ESCP)**\nThe fundamental legal agreement between the Borrower and the Bank.\n\n[ ] **Material Measures:** Does the ESCP summarize all actions required to achieve ESS compliance, including specific completion dates?\n[ ] **Adaptive Management:** Does the ESCP include a formal process for managing project changes or unforeseen circumstances?\n[ ] **Capacity Building:** Does the ESCP include a summary of the training and organizational structure the Borrower will maintain to implement the plan?\n[ ] **Disclosure:** Has the draft ESCP been disclosed before project appraisal?\n\n**Phase IV: Procurement and Bidding Integration**\nAligning ESS requirements with PPCA Parts IV and V.\n\n[ ] **Bidding Documents (PPCA Section 34/58):** Do the standard bidding documents include descriptions of procurement requirements in conformity with applicable environmental protection legislation?\n[ ] **Contractor Management:** Are all relevant aspects of the ESCP and relevant management tools incorporated into the tender documents?\n[ ] **Labor Management Procedures:** Has a written labor management procedure been developed to ensure fair treatment, OHS compliance, and the prevention of forced/child labor?\n[ ] **Prequalification:** If using prequalification (per PPCA Section 32), are the criteria objective and inclusive of the bidder's technical/financial capacity to manage E&S risks?\n[ ] **Grievance Redress Mechanism (GRM):** Is a project-level GRM established and publicized to handle concerns from project-affected parties and project workers?\n\n**Phase V: Implementation, Monitoring, and Reporting**\nThe post-contract phase (PPCA Section 41).\n\n[ ] **Monitoring Systems:** Are resources and personnel in place to track performance against the ESCP and ESSs?\n[ ] **Reporting Frequency:** Is the Borrower providing regular monitoring reports to the Bank (at least annually)?\n[ ] **Incident Notification:** Is there a protocol to notify the Bank within 24–48 hours of any project-related incident or accident that has a significant adverse effect?\n[ ] **Contractor Oversight:** Is the Procuring Entity monitoring contractor compliance with contractual E&S commitments and applying non-compliance remedies where necessary?\n[ ] **External Audits:** Has the Auditor-General or an independent entity been scheduled to conduct E&S compliance audits as part of the statutory audit of procurement activities?"
                },
                {
                    id: "1.5",
                    type: "quiz",
                    title: "1.5 Module 1 Quiz",
                    duration: "5 Questions",
                    content: "Certification quiz for Module 1."
                }
            ]
        },
        {
            moduleId: 2,
            title: "Statutory Procurement Frameworks: PPCC Act",
            lessons: [
                { id: "2.1", type: "reading", title: "2.1 Bidding Documentation Standards", duration: "10 min read", content: "Procurement requirements must be in conformity with applicable environmental protection legislation and international standards." }
            ]
        }
    ],
    quiz: [
        {
            questionId: 1,
            question: "A proposed infrastructure project cuts through a recognized 'Critical Habitat'. The Borrower proposes a biodiversity offset scheme to achieve 'Net Gain'. Under strict application of the World Bank Mitigation Hierarchy (ESS6) and the SOP regarding Concession Feasibility (PPCA Section 103), why might this proposal be immediately rejected by the Bank before even considering the offset's technical viability?",
            options: [
                "The offset plan was not included in the initial Preliminary Feasibility Study submitted to the IMCC.",
                "Offsets are a 'final resort measure'; the Borrower failed to demonstrate that no technically and financially feasible alternatives exist to locate the project on modified or degraded land.",
                "The Borrower used a 'Net Loss' calculation instead of a 'Net Gain' metric required by the Environmental Protection Agency (EPA) of Liberia.",
                "Offsets are strictly prohibited for all Critical Habitats under the new World Bank Environmental and Social Framework (ESF)."
            ],
            correctAnswer: "Offsets are a 'final resort measure'; the Borrower failed to demonstrate that no technically and financially feasible alternatives exist to locate the project on modified or degraded land.",
            explanation: "The hierarchy mandates 'Anticipate and Avoid' as the primary objective. Offsets (Compensation) are only considered once avoidance, minimization, and mitigation have been exhausted and proven impossible [ESS6, SOP Phase II]."
        },
        {
            questionId: 2,
            question: "The 'Environmental and Social Commitment Plan' (ESCP) is drafted during Phase III. According to the SOP, how does this legal instrument interact with the Liberian PPCC Act's 'Form of Contract' (Section 117) regarding contractor non-compliance?",
            options: [
                "The ESCP is a separate document and does not need to be referenced in the commercial contract.",
                "The ESCP's material measures must be incorporated into the tender documents and the final contract; failure to do so renders the 'lowest evaluated responsive bid' determination legally void under the 'responsiveness' criteria of PPCA Section 58.",
                "If the contractor violates the ESCP, the burden of compliance shifts entirely to the World Bank's Inspection Panel.",
                "The ESCP only applies to the Borrower (Government), not the private contractor."
            ],
            correctAnswer: "The ESCP's material measures must be incorporated into the tender documents and the final contract; failure to do so renders the 'lowest evaluated responsive bid' determination legally void under the 'responsiveness' criteria of PPCA Section 58.",
            explanation: "The SOP (Phase IV: Contractor Management) requires incorporation of the ESCP into tender documents. A bid unable to meet these E&S requirements is 'non-responsive' under PPCA Section 58."
        },
        {
            questionId: 3,
            question: "For a project classified as 'High Risk', the timeline for disclosing the Environmental and Social Impact Assessment (ESIA) and the draft ESCP is critical. According to the SOP (Phase III) and ESS10, when must these documents be disclosed relative to the project cycle?",
            options: [
                "After the loan is approved but before the first disbursement of funds.",
                "Simultaneously with the final signing of the Financing Agreement.",
                "Before Project Appraisal begins, to allow for meaningful stakeholder consultation on project design.",
                "Within 30 days of the project effectiveness date."
            ],
            correctAnswer: "Before Project Appraisal begins, to allow for meaningful stakeholder consultation on project design.",
            explanation: "High Risk projects require disclosure of E&S documentation *prior* to project appraisal to ensure stakeholders can influence the design and mitigation measures (SOP Phase III: Disclosure)."
        },
        {
            questionId: 4,
            question: "In the 'Project Identification' phase for a Concession, the SOP mandates the establishment of a specific body to oversee compliance. Per PPCA Section 77, which body is this, and how does it differ from a standard Procurement Committee?",
            options: [
                "The Public Procurement & Concessions Commission (PPCC); it has veto power over all contracts.",
                "The Project Implementation Unit (PIU); it is staffed by external consultants.",
                "The Inter-Ministerial Concessions Committee (IMCC); it oversees large-scale concessions involving multiple ministries.",
                "The Entity Concession Committee; unlike a Procurement Committee, it is specifically formed to navigate the complexities of concession feasibility and negotiation under strict legislative oversight."
            ],
            correctAnswer: "The Entity Concession Committee; unlike a Procurement Committee, it is specifically formed to navigate the complexities of concession feasibility and negotiation under strict legislative oversight.",
            explanation: "SOP Phase I explicitly references 'Entity Concession Committee (per Section 77)' for concessions, distinguishing it from the standard Procurement Committee used for goods/works/services."
        },
        {
            questionId: 5,
            question: "A project requires the urgent physical displacement of 50 households for a road expansion. The Ministry of Finance is delaying the release of compensation funds, but the contractor is ready to mobilize. Under the 'Mitigation' pillar of the hierarchy (ESS5), can the contractor begin clearing the land if they 'minimize' the footprint initially?",
            options: [
                "Yes, if the displaced persons are given temporary written assurances of future payment.",
                "No. The hierarchy rules for ESS5 mandate that compensation at full replacement cost be paid *before* any displacement or land seizure occurs; strictly prohibiting 'pay later' schemes regardless of construction urgency.",
                "Yes, provided the contractor sets up a Grievance Redress Mechanism (GRM) first.",
                "No, unless the World Bank Country Director issues a 'No Objection' waiver."
            ],
            correctAnswer: "No. The hierarchy rules for ESS5 mandate that compensation at full replacement cost be paid *before* any displacement or land seizure occurs; strictly prohibiting 'pay later' schemes regardless of construction urgency.",
            explanation: "ESS5 is unequivocal: displacement cannot occur until compensation is paid. This falls under the 'Mitigate' pillar: restoring livelihoods must be timely and cannot be deferred."
        }
    ]
};

export default function PMAcademy() {
    const navigate = useNavigate();
    // State for navigation
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [activeLessonIndex, setActiveLessonIndex] = useState(0);
    const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true });

    // Audio State
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Quiz State
    const [quizActive, setQuizActive] = useState(false);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [quizScore, setQuizScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Mobile Menu State
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Derive current data
    const currentModule = courseData.modules[activeModuleIndex];
    const currentLesson = currentModule.lessons[activeLessonIndex];
    const quizQuestions = courseData.quiz;

    // Toggle module expansion
    const toggleModule = (index: number) => {
        setExpandedModules(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Handle lesson selection
    const handleLessonSelect = (moduleIndex: number, lessonIndex: number) => {
        setActiveModuleIndex(moduleIndex);
        setActiveLessonIndex(lessonIndex);
        // Reset quiz state when navigating away
        setQuizActive(false);
        setQuizCompleted(false);
        setCurrentQuestionIdx(0);
        setQuizScore(0);
        setSelectedOption(null);
        setIsCorrect(null);
        // Reset audio state
        setIsPlaying(false);
    };

    const handleToggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleStartQuiz = () => {
        setQuizActive(true);
        setQuizCompleted(false);
        setCurrentQuestionIdx(0);
        setQuizScore(0);
    };

    const handleOptionSelect = (option: string) => {
        if (selectedOption) return; // Prevent changing after selection
        setSelectedOption(option);

        const correct = option === quizQuestions[currentQuestionIdx].correctAnswer;
        setIsCorrect(correct);

        if (correct) {
            setQuizScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIdx < quizQuestions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleRetryQuiz = () => {
        setQuizActive(false);
        setQuizCompleted(false);
        setCurrentQuestionIdx(0);
        setQuizScore(0);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    // Render content based on type
    const renderContent = () => {
        // Special render for Quiz lesson type
        if (currentLesson.type === 'quiz') {
            if (!quizActive && !quizCompleted) {
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Sticky Header */}
                        <header className="sticky top-0 z-20 bg-stone-950/90 backdrop-blur-md pb-6 pt-2 mb-8 border-b border-stone-800 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                                    <span className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest">Module Quiz</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">{currentLesson.title}</h2>
                            </div>
                        </header>

                        <div className="max-w-2xl mx-auto py-12 text-center group">
                            <div className="bg-stone-900/50 border border-stone-800 hover:border-[#FFD700] transition-all p-12 cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-800 via-[#FFD700] to-stone-800 opacity-50"></div>
                                <ShieldCheck className="w-16 h-16 text-stone-600 group-hover:text-[#FFD700] mx-auto mb-6 transition-colors" />
                                <h2 className="text-3xl font-black text-white mb-4">{currentLesson.title}</h2>
                                <p className="text-stone-400 mb-8 max-w-md mx-auto">{currentLesson.content}</p>
                                <div className="flex items-center justify-center gap-8 mb-8 text-xs font-mono text-stone-500">
                                    <span>{quizQuestions.length} QUESTIONS</span>
                                    <span>•</span>
                                    <span>80% TO PASS</span>
                                </div>
                                <button
                                    onClick={handleStartQuiz}
                                    className="bg-[#FFD700] hover:bg-[#E5C100] text-stone-950 px-8 py-4 font-bold text-sm uppercase tracking-widest transition-all duration-150 hover:scale-105 active:scale-95"
                                >
                                    Start Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }

            if (quizActive && !quizCompleted) {
                const question = quizQuestions[currentQuestionIdx];
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Sticky Header */}
                        <header className="sticky top-0 z-20 bg-stone-950/90 backdrop-blur-md pb-6 pt-2 mb-8 border-b border-stone-800 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                                    <span className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest">Module Quiz</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">{currentLesson.title}</h2>
                            </div>
                            <div className="bg-stone-900 px-4 py-2 border border-stone-800 rounded-sm">
                                <span className="text-[#FFD700] font-mono font-bold">{currentQuestionIdx + 1}/{quizQuestions.length}</span>
                            </div>
                        </header>

                        <div className="max-w-3xl mx-auto md:mx-0">
                            {/* Progress Bar */}
                            <div className="h-1 w-full bg-stone-900 rounded-full mb-12 overflow-hidden">
                                <div
                                    className="h-full bg-[#FFD700] transition-all duration-500"
                                    style={{ width: `${((currentQuestionIdx) / quizQuestions.length) * 100}%` }}
                                ></div>
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                                {question.question}
                            </h2>

                            <div className="space-y-4">
                                {question.options.map((option, idx) => {
                                    let stateStyle = "border-stone-800 hover:border-stone-600 bg-stone-900/50";
                                    if (selectedOption) {
                                        if (option === question.correctAnswer) {
                                            stateStyle = "border-green-500 bg-green-500/10 text-green-400";
                                        } else if (option === selectedOption) {
                                            stateStyle = "border-red-500 bg-red-500/10 text-red-400";
                                        } else {
                                            stateStyle = "border-stone-800 opacity-50";
                                        }
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={!!selectedOption}
                                            className={`w-full text-left p-6 border rounded-sm transition-all duration-300 flex items-start gap-4 ${stateStyle}`}
                                        >
                                            <div className={`mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center
                                                ${stateStyle.includes('green') ? 'border-green-500 bg-green-500' :
                                                    stateStyle.includes('red') ? 'border-red-500' : 'border-stone-600'}
                                            `}>
                                                {stateStyle.includes('green') && <CheckCircle className="w-3 h-3 text-stone-900" />}
                                            </div>
                                            <span className={selectedOption && option === question.correctAnswer ? "font-bold" : ""}>{option}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {selectedOption && (
                                <div className="mt-8 animate-in fade-in slide-in-from-bottom-2">
                                    <div className={`p-6 rounded-sm border mb-8 ${isCorrect ? 'bg-green-900/20 border-green-900/50' : 'bg-red-900/20 border-red-900/50'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            {isCorrect ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
                                            <span className={`text-xs font-bold uppercase tracking-widest ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                                {isCorrect ? 'Correct Analysis' : 'Incorrect'}
                                            </span>
                                        </div>
                                        <p className="text-stone-300 text-sm leading-relaxed">
                                            {question.explanation}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleNextQuestion}
                                        className="w-full bg-[#FFD700] hover:bg-[#E5C100] text-stone-950 py-4 font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                    >
                                        {currentQuestionIdx < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }

            if (quizCompleted) {
                const passed = quizScore >= 4; // 80% pass rate
                return (
                    <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500 py-12 text-center">
                        <div className="bg-stone-900 border border-stone-800 p-12 relative overflow-hidden">
                            {passed && <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay"></div>}
                            {!passed && <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay"></div>}

                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-stone-950 border-4 border-stone-800 mb-8 relative z-10">
                                <span className={`text-3xl font-black ${passed ? 'text-green-500' : 'text-red-500'}`}>
                                    {Math.round((quizScore / quizQuestions.length) * 100)}%
                                </span>
                            </div>

                            <h2 className="text-3xl font-black text-white mb-4 relative z-10">
                                {passed ? 'Certification Achieved' : 'Quiz Failed'}
                            </h2>
                            <p className="text-stone-400 mb-8 relative z-10 max-w-md mx-auto">
                                {passed
                                    ? "Congratulations. You have demonstrated mastery of the Mitigation Hierarchy and Liberian Statutory Frameworks."
                                    : "You did not meet the required 80% threshold. Review the SOP and Reading materials before re-attempting."
                                }
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
                                <button
                                    onClick={handleRetryQuiz}
                                    className="w-full md:w-auto px-8 py-3 border border-stone-700 hover:border-white text-stone-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                                >
                                    Retry Quiz
                                </button>
                                {passed && (
                                    <button className="w-full md:w-auto bg-[#FFD700] hover:bg-[#E5C100] text-stone-950 px-8 py-3 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                                        <Award className="w-4 h-4" /> Claim Certificate
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }
        }

        switch (currentLesson.type) {
            case 'video':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* Sticky Header */}
                        <header className="sticky top-0 z-20 bg-stone-950/90 backdrop-blur-md pb-6 pt-2 mb-8 border-b border-stone-800">
                            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-stone-500 mb-6">
                                <span className="hover:text-stone-300 cursor-pointer transition-colors">L-Pro Academy</span>
                                <span className="text-[#FFD700] opacity-50">/</span>
                                <span className="hover:text-stone-300 cursor-pointer transition-colors">Infrastructure Governance</span>
                                <span className="text-[#FFD700] opacity-50">/</span>
                                <span className="text-stone-300">Section 01</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">{currentLesson.title}</h2>
                        </header>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Main Content (70%) */}
                            <div className="xl:col-span-2 space-y-8">
                                <div className="aspect-video bg-black rounded-2xl border border-[#FFD700]/20 shadow-[0_0_50px_-12px_rgba(255,215,0,0.15)] overflow-hidden relative ring-1 ring-white/5 relative group p-1">
                                    <video
                                        src="/assets/liberia-rulebook.mp4"
                                        controls
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity rounded-xl"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] font-black uppercase tracking-widest px-3 py-1 border border-[#FFD700]/20 rounded-full">
                                            Video Lesson
                                        </span>
                                        <span className="text-stone-500 text-xs font-bold uppercase tracking-widest">{currentLesson.duration}</span>
                                    </div>
                                    <p className="text-stone-400 text-lg leading-relaxed max-w-3xl font-light">
                                        {currentLesson.content}
                                    </p>
                                </div>
                            </div>

                            <div className="xl:col-span-1 border-l border-stone-800/50 pl-10 space-y-12 hidden xl:block">
                                <div>
                                    <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase mb-6">Key Takeaways</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3 text-sm text-stone-300 leading-relaxed">
                                            <span className="mt-0.5 text-[#FFD700]"><ChevronRight className="w-4 h-4" /></span>
                                            Infrastructure governance is non-negotiable for funding.
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-stone-300 leading-relaxed">
                                            <span className="mt-0.5 text-[#FFD700]"><ChevronRight className="w-4 h-4" /></span>
                                            Comparison between PPCC Act and World Bank ESF standards.
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-stone-300 leading-relaxed">
                                            <span className="mt-0.5 text-[#FFD700]"><ChevronRight className="w-4 h-4" /></span>
                                            Strategic importance of E&S compliance in bid evaluation.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase mb-6">Instructor</h4>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-[#FFD700] font-bold">
                                            LP
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">L-Pro AI Director</p>
                                            <p className="text-xs text-stone-400">Governance Specialist</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 rounded-lg border border-stone-700 bg-stone-900/50 hover:bg-stone-800 text-stone-300 text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group">
                                        <Sparkles className="w-4 h-4 text-stone-500 group-hover:text-[#FFD700] transition-colors" />
                                        Query AI on this topic
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'reading':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Sticky Header */}
                        <header className="sticky top-0 z-20 bg-stone-950/90 backdrop-blur-md pb-6 pt-2 mb-8 border-b border-stone-800 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <BookOpen className="w-4 h-4 text-[#FFD700]" />
                                    <span className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest">Required Reading</span>
                                    <span className="text-stone-600 text-[10px] font-bold uppercase tracking-widest">• {currentLesson.duration}</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">{currentLesson.title}</h2>
                            </div>
                        </header>

                        <div className="max-w-3xl mx-auto md:mx-0">
                            <article className="prose prose-invert prose-stone max-w-none prose-p:text-stone-300 prose-p:text-lg prose-p:leading-8 prose-headings:text-white prose-headings:font-bold prose-strong:text-white prose-strong:font-black antialiased font-serif">
                                {/* Simple markdown parsing for the content */}
                                {currentLesson.content.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-6 whitespace-pre-line">
                                        {paragraph.split('**').map((chunk, i) =>
                                            i % 2 === 1 ? <strong key={i} className="text-white">{chunk}</strong> : chunk
                                        )}
                                    </p>
                                ))}
                            </article>
                        </div>
                    </div>
                );
            case 'audio':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Sticky Header */}
                        <header className="sticky top-0 z-20 bg-stone-950/90 backdrop-blur-md pb-6 pt-2 mb-8 border-b border-stone-800 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Headphones className="w-4 h-4 text-[#FFD700]" />
                                    <span className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest">Audio Lesson</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">{currentLesson.title}</h2>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Main Content (70%) */}
                            <div className="xl:col-span-2">
                                <div className="bg-stone-900 border border-stone-800 p-12 text-center rounded-sm shadow-2xl relative overflow-hidden group">

                                    {/* Background Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-stone-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="w-24 h-24 bg-stone-950 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-stone-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10">
                                        <Headphones className="w-10 h-10 text-[#FFD700]" />
                                    </div>

                                    <h2 className="text-2xl font-black text-white mb-2 relative z-10">{currentLesson.title}</h2>
                                    <p className="text-stone-500 mb-8 relative z-10">{currentLesson.content}</p>

                                    <div className="bg-stone-950 p-4 rounded-full border border-stone-800 flex items-center gap-4 relative z-10">
                                        <audio
                                            ref={audioRef}
                                            src={currentLesson.audioSrc}
                                            onEnded={() => setIsPlaying(false)}
                                        />
                                        <button
                                            onClick={handleToggleAudio}
                                            className="w-10 h-10 bg-[#FFD700] text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                                        >
                                            {isPlaying ? <Pause className="w-4 h-4 fill-current ml-0.5" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                                        </button>
                                        <div className="flex-1 h-1 bg-stone-800 rounded-full overflow-hidden">
                                            <div className={`h-full bg-stone-600 transition-all duration-300 ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'}`}></div>
                                        </div>
                                        <span className="text-xs font-mono text-stone-400">{currentLesson.duration}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Context Sidebar (30%) */}
                            <div className="xl:col-span-1 border-l border-stone-800 pl-8 hidden xl:block">
                                <div className="bg-stone-900/50 p-6 border border-stone-800 rounded-sm">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Listening Guide</h3>
                                    <div className="space-y-4 text-xs text-stone-400">
                                        <p>This executive lesson covers the nuances of ESCP drafting.</p>
                                        <p>Listen for:</p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Stakeholder definitions</li>
                                            <li>Disclosure timelines</li>
                                            <li>Legal implications</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'document':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Sticky Header */}
                        <header className="sticky top-0 z-20 bg-stone-950/90 backdrop-blur-md pb-6 pt-2 mb-8 border-b border-stone-800 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <FileText className="w-4 h-4 text-[#FFD700]" />
                                    <span className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest">Reference Guide</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">{currentLesson.title}</h2>
                            </div>
                            <button className="hidden md:flex items-center gap-2 bg-stone-100 text-stone-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                <Download className="w-4 h-4" /> Download PDF
                            </button>
                        </header>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Main Document Content (70%) */}
                            <div className="xl:col-span-2">
                                <div className="bg-stone-900 border-l-4 border-[#FFD700] p-8 md:p-12 shadow-2xl">
                                    <div className="space-y-6">
                                        <p className="text-stone-400 leading-relaxed whitespace-pre-line font-serif text-lg">
                                            {currentLesson.content}
                                        </p>
                                    </div>

                                    <button className="md:hidden mt-8 w-full bg-stone-100 text-stone-900 py-4 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" /> Download SOP
                                    </button>
                                </div>
                            </div>
                            {/* Context Sidebar (30%) */}
                            <div className="xl:col-span-1 border-l border-stone-800 pl-8 hidden xl:block">
                                <div className="bg-stone-900/50 p-6 border border-stone-800 rounded-sm">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Document Metadata</h3>
                                    <div className="space-y-4 text-xs text-stone-400">
                                        <div className="flex justify-between">
                                            <span>Version:</span>
                                            <span className="text-white">v2.4 (2024 Revised)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Authority:</span>
                                            <span className="text-white">World Bank / PPCC</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Pages:</span>
                                            <span className="text-white">14</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Select a lesson</div>;
        }
    };

    return (
        <div className="flex h-full bg-stone-950 text-stone-200 overflow-hidden">


            {/* PANE 2: Contextual Sidebar (Desktop) */}
            <div className="hidden lg:flex w-80 bg-stone-900 border-r border-stone-800 flex-col flex-shrink-0 z-20">
                <div className="p-8 border-b border-stone-800 flex-shrink-0 bg-stone-900">
                    <h2 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">L-Pro Academy</h2>
                    <h1 className="text-lg font-bold text-white leading-tight mb-6">{courseData.courseTitle}</h1>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 mb-2">
                        <span>YOUR PROGRESS</span>
                        <span>15%</span>
                    </div>
                    <div className="h-1 w-full bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFD700] w-[15%] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar">
                    {courseData.modules.map((module, mIdx) => (
                        <div key={module.moduleId} className="border-b border-stone-800/50">
                            <button
                                onClick={() => toggleModule(mIdx)}
                                className="w-full text-left p-6 transition-colors hover:bg-stone-800/50 flex items-start gap-4 group"
                            >
                                <div className={`mt-0.5 transition-transform duration-300 ${expandedModules[mIdx] ? 'rotate-90' : ''}`}>
                                    <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-stone-500 mb-1.5 flex justify-between">
                                        <span>Section 0{module.moduleId}</span>
                                        <span className="text-stone-700">{module.lessons.length} Lessons</span>
                                    </div>
                                    <div className="text-sm font-bold text-stone-300 group-hover:text-white leading-snug">
                                        {module.title}
                                    </div>
                                </div>
                            </button>

                            <div className={`bg-stone-950 border-t border-stone-900 overflow-hidden transition-all duration-300 ${expandedModules[mIdx] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {module.lessons.map((lesson, lIdx) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => handleLessonSelect(mIdx, lIdx)}
                                        className={`w-full text-left pl-14 pr-6 py-4 border-b border-stone-900 flex items-center justify-between group transition-all duration-300 ease-out hover:scale-[1.01] hover:bg-stone-800/80 relative
                                            ${activeModuleIndex === mIdx && activeLessonIndex === lIdx ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-300'}
                                        `}
                                    >
                                        {activeModuleIndex === mIdx && activeLessonIndex === lIdx && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD700]"></div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            {lesson.type === 'video' && <Play className="w-3 h-3" />}
                                            {lesson.type === 'reading' && <FileText className="w-3 h-3" />}
                                            {lesson.type === 'audio' && <Headphones className="w-3 h-3" />}
                                            {lesson.type === 'document' && <Download className="w-3 h-3" />}
                                            {lesson.type === 'quiz' && <Award className="w-3 h-3" />}
                                            <span className="text-xs font-medium truncate max-w-[180px]">{lesson.title}</span>
                                        </div>
                                        {activeModuleIndex === mIdx && activeLessonIndex === lIdx && (
                                            <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* PANE 2: Contextual Sidebar (Mobile Overlay) */}
            <div className={`
                fixed inset-0 z-50 flex lg:hidden
                ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
            `}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileMenuOpen(false)}
                ></div>

                {/* Drawer */}
                <div className={`
                    w-[85vw] max-w-[320px] bg-stone-950 border-r border-stone-800 flex flex-col items-start shadow-2xl transition-transform duration-300 transform
                    ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="w-full p-8 border-b border-stone-800 flex-shrink-0 bg-stone-900 flex justify-between items-start">
                        <div>
                            <h2 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">L-Pro Academy</h2>
                            <h1 className="text-lg font-bold text-white leading-tight mb-6">{courseData.courseTitle}</h1>
                            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-500 mb-2">
                                <span>YOUR PROGRESS</span>
                                <span>15%</span>
                            </div>
                            <div className="h-1 w-full bg-stone-800 rounded-full overflow-hidden">
                                <div className="h-full bg-[#FFD700] w-[15%] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                            </div>
                        </div>
                        <button onClick={() => setMobileMenuOpen(false)} className="text-stone-500 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="w-full flex-grow overflow-y-auto custom-scrollbar">
                        {courseData.modules.map((module, mIdx) => (
                            <div key={module.moduleId} className="border-b border-stone-800/50">
                                <button
                                    onClick={() => toggleModule(mIdx)}
                                    className="w-full text-left p-6 transition-colors hover:bg-stone-800/50 flex items-start gap-4 group"
                                >
                                    <div className={`mt-0.5 transition-transform duration-300 ${expandedModules[mIdx] ? 'rotate-90' : ''}`}>
                                        <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[9px] font-black uppercase tracking-widest text-stone-500 mb-1.5 flex justify-between">
                                            <span>Section 0{module.moduleId}</span>
                                            <span className="text-stone-700">{module.lessons.length} Lessons</span>
                                        </div>
                                        <div className="text-sm font-bold text-stone-300 group-hover:text-white leading-snug">
                                            {module.title}
                                        </div>
                                    </div>
                                </button>
                                <div className={`bg-stone-950 border-t border-stone-900 overflow-hidden transition-all duration-300 ${expandedModules[mIdx] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {module.lessons.map((lesson, lIdx) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => {
                                                handleLessonSelect(mIdx, lIdx);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`w-full text-left pl-14 pr-6 py-4 border-b border-stone-900 flex items-center justify-between group transition-all duration-300 ease-out hover:scale-[1.01] hover:bg-stone-800/80 relative
                                                ${activeModuleIndex === mIdx && activeLessonIndex === lIdx ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-300'}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                {lesson.type === 'video' && <Play className="w-3 h-3" />}
                                                {lesson.type === 'reading' && <FileText className="w-3 h-3" />}
                                                {lesson.type === 'audio' && <Headphones className="w-3 h-3" />}
                                                {lesson.type === 'document' && <Download className="w-3 h-3" />}
                                                {lesson.type === 'quiz' && <Award className="w-3 h-3" />}
                                                <span className="text-xs font-medium truncate max-w-[180px]">{lesson.title}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PANE 3: The Canvas (Main Content) */}
            <div className="flex-grow flex flex-col bg-stone-950 relative overflow-hidden h-full">

                {/* Top Bar (Optional user profile, etc.) */}
                <div className="h-16 border-b border-stone-800/50 bg-stone-950/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden text-stone-400 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFD700]">
                            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
                            Active Course
                        </div>
                    </div>
                    {/* User Profile Placeholder */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700"></div>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-8 md:p-12 pb-24 custom-scrollbar">
                    {renderContent()}
                </div>

            </div>
        </div>
    );
}
