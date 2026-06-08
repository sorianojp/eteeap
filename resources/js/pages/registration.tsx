import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    CheckCircle2,
    ClipboardList,
    FileCheck2,
    GraduationCap,
    Plus,
    RotateCcw,
    Save,
    Trash2,
    Upload,
    UserRound,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

type FormalEducation = {
    course: string;
    school: string;
    date_from: string;
    date_to: string;
};

type Training = {
    title: string;
    certificate: string;
    date_from: string;
    date_to: string;
};

type Certification = {
    title: string;
    agency: string;
    certifiedDate: string;
    rating: string;
};

type WorkExperience = {
    post: string;
    date_from: string;
    date_to: string;
    company: string;
    status: string;
    supervisor: string;
    reason: string;
    responsibilities: string;
    references: string;
};

type Award = {
    award: string;
    organization: string;
    date: string;
};

type CreativeWork = {
    description: string;
    date: string;
    attestingOrganization: string;
};

type RepeaterConfig<T> = {
    title: string;
    description?: string;
    items: T[];
    emptyItem: T;
    renderItem: (
        item: T,
        index: number,
        update: (item: T) => void,
    ) => ReactNode;
    setItems: (items: T[]) => void;
};

const fieldClass = '';

const textareaClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full resize-y rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50';

const formalEducationEmpty: FormalEducation = {
    course: '',
    school: '',
    date_from: '',
    date_to: '',
};

const trainingEmpty: Training = {
    title: '',
    certificate: '',
    date_from: '',
    date_to: '',
};

const certificationEmpty: Certification = {
    title: '',
    agency: '',
    certifiedDate: '',
    rating: '',
};

const workEmpty: WorkExperience = {
    post: '',
    date_from: '',
    date_to: '',
    company: '',
    status: '',
    supervisor: '',
    reason: '',
    responsibilities: '',
    references: '',
};

const awardEmpty: Award = {
    award: '',
    organization: '',
    date: '',
};

const creativeWorkEmpty: CreativeWork = {
    description: '',
    date: '',
    attestingOrganization: '',
};

const documentChecklist = [
    'NSO authenticated birth certificate',
    'Barangay clearance, NBI clearance, or passport',
    'Service record or certificate of employment',
    'Most recent academic record or diploma',
    'Comprehensive resume',
    'Certificates of training and workshops completed',
    'Certificates of individual proficiency in the discipline or field of interest',
    'Other evidence of capability and knowledge in the field',
    'Accomplished ETEEAP application form',
];

const samplePlaceholders: Record<string, string> = {
    last_name: 'e.g. Dela Cruz',
    first_name: 'e.g. Juan',
    middle_name: 'e.g. Santos',
    address: 'e.g. 123 Mabini Street, Cebu City',
    zip_code: 'e.g. 6000',
    telephone: 'e.g. 0917 123 4567',
    birth_date: 'e.g. 1990-01-15',
    birthplace: 'e.g. Manila',
    civil_status: 'e.g. Single',
    sex: 'e.g. Female',
    nationality: 'e.g. Filipino',
    languages: 'e.g. Filipino, English, Cebuano',
    first_priority: 'e.g. Bachelor of Science in Social Work',
    second_priority: 'e.g. Bachelor of Science in Psychology',
    third_priority: 'e.g. Bachelor of Public Administration',
    application_goals:
        'e.g. To complete my degree and strengthen my professional qualifications.',
    learning_time_plan:
        'e.g. I can dedicate 8 hours every weekend for portfolio preparation and learning activities.',
    overseas_accreditation_plan:
        'e.g. I plan to visit the Philippines in July 2026 for assessment requirements.',
    hobbies: 'e.g. Reading, community organizing, coaching youth activities',
    special_skills: 'e.g. Case documentation, counseling, report writing',
    work_related_learning:
        'e.g. Led a community outreach project and learned program coordination.',
    volunteer_activities:
        'e.g. Volunteer counselor for barangay youth development programs',
    travels:
        'e.g. Visited Davao for a work conference on community-based services.',
    degree_contribution_essay:
        'e.g. Earning this degree will help me serve my workplace and community with stronger professional competence.',
};

function samplePlaceholder(id: string, label: string): string {
    if (samplePlaceholders[id]) {
        return samplePlaceholders[id];
    }

    const normalizedLabel = label.toLowerCase();

    if (
        normalizedLabel.includes('course') ||
        normalizedLabel.includes('degree')
    ) {
        return 'e.g. Bachelor of Science in Social Work';
    }

    if (normalizedLabel.includes('school')) {
        return 'e.g. University of Cebu, Cebu City';
    }

    if (normalizedLabel.includes('inclusive dates')) {
        return 'e.g. 2018 - 2022';
    }

    if (normalizedLabel.includes('training program')) {
        return 'e.g. Basic Counseling Skills Workshop';
    }

    if (normalizedLabel.includes('certificate obtained')) {
        return 'e.g. Certificate of Completion';
    }

    if (normalizedLabel.includes('certification examination')) {
        return 'e.g. Civil Service Professional Examination';
    }

    if (normalizedLabel.includes('certifying agency')) {
        return 'e.g. Civil Service Commission';
    }

    if (normalizedLabel.includes('date certified')) {
        return 'e.g. 2024-03-15';
    }

    if (normalizedLabel.includes('rating')) {
        return 'e.g. 88%';
    }

    if (
        normalizedLabel.includes('post') ||
        normalizedLabel.includes('designation')
    ) {
        return 'e.g. Community Development Officer';
    }

    if (normalizedLabel.includes('company')) {
        return 'e.g. ABC Social Services, Cebu City';
    }

    if (normalizedLabel.includes('employment status')) {
        return 'e.g. Full-time regular';
    }

    if (normalizedLabel.includes('supervisor')) {
        return 'e.g. Maria R. Santos, Program Manager';
    }

    if (normalizedLabel.includes('references')) {
        return 'e.g. Ana Reyes, Pedro Cruz, Liza Ramos';
    }

    if (normalizedLabel.includes('reason')) {
        return 'e.g. Accepted a role with broader responsibilities.';
    }

    if (normalizedLabel.includes('responsibilities')) {
        return 'e.g. Managed client intake, prepared case reports, and coordinated referrals.';
    }

    if (normalizedLabel.includes('award conferred')) {
        return 'e.g. Outstanding Employee Award';
    }

    if (normalizedLabel.includes('organization')) {
        return 'e.g. City Social Welfare Office';
    }

    if (normalizedLabel.includes('date awarded')) {
        return 'e.g. 2023-12-10';
    }

    if (normalizedLabel.includes('description')) {
        return 'e.g. Authored a community case management handbook.';
    }

    if (normalizedLabel.includes('date accomplished')) {
        return 'e.g. 2024-05-20';
    }

    if (normalizedLabel.includes('publishing agency')) {
        return 'e.g. Philippine Association of Social Workers';
    }

    return `e.g. ${label}`;
}

function Field({
    id,
    label,
    type = 'text',
    required = false,
    placeholder,
    autoComplete,
}: {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    autoComplete?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                autoComplete={autoComplete}
                className={fieldClass}
                id={id}
                name={id}
                placeholder={placeholder ?? samplePlaceholder(id, label)}
                required={required}
                type={type}
            />
        </div>
    );
}

function TextareaField({
    id,
    label,
    rows = 4,
    required = false,
    placeholder,
}: {
    id: string;
    label: string;
    rows?: number;
    required?: boolean;
    placeholder?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <textarea
                className={textareaClass}
                id={id}
                name={id}
                placeholder={placeholder ?? samplePlaceholder(id, label)}
                required={required}
                rows={rows}
            />
        </div>
    );
}

function Section({
    id,
    icon,
    title,
    children,
}: {
    id: string;
    icon: ReactNode;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="scroll-mt-6 py-8" id={id}>
            <Separator className="mb-8" />
            <div className="mb-5 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    {icon}
                </span>
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            {children}
        </section>
    );
}

function Repeater<T extends object>({
    title,
    description,
    items,
    emptyItem,
    renderItem,
    setItems,
}: RepeaterConfig<T>) {
    function updateItem(index: number, item: T) {
        setItems(
            items.map((current, currentIndex) =>
                currentIndex === index ? item : current,
            ),
        );
    }

    function removeItem(index: number) {
        setItems(items.filter((_, currentIndex) => currentIndex !== index));
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h3 className="font-medium">{title}</h3>
                    {description && (
                        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => setItems([...items, { ...emptyItem }])}
                    type="button"
                >
                    <Plus />
                    Add
                </Button>
            </div>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        className="rounded-lg border bg-muted/30 p-4"
                        key={index}
                    >
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-muted-foreground">
                                Entry {index + 1}
                            </span>
                            {items.length > 1 && (
                                <Button
                                    aria-label={`Remove ${title} entry ${index + 1}`}
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => removeItem(index)}
                                    size="sm"
                                    type="button"
                                    variant="outline"
                                >
                                    <Trash2 />
                                    Remove
                                </Button>
                            )}
                        </div>
                        {renderItem(item, index, (updatedItem) =>
                            updateItem(index, updatedItem),
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function SelectField({
    id,
    label,
    options,
    placeholder,
}: {
    id: string;
    label: string;
    options: string[];
    placeholder?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Select name={id}>
                <SelectTrigger className="w-full" id={id}>
                    <SelectValue
                        placeholder={
                            placeholder ?? samplePlaceholder(id, label)
                        }
                    />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

function ControlledInput({
    id,
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                className={fieldClass}
                id={id}
                name={id}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder ?? samplePlaceholder(id, label)}
                type={type}
                value={value}
            />
        </div>
    );
}

function ControlledTextarea({
    id,
    label,
    value,
    onChange,
    rows = 4,
    placeholder,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    placeholder?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <textarea
                className={textareaClass}
                id={id}
                name={id}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder ?? samplePlaceholder(id, label)}
                rows={rows}
                value={value}
            />
        </div>
    );
}

export default function Registration() {
    const { auth } = usePage().props;
    const [submitted, setSubmitted] = useState(false);
    const [formalEducation, setFormalEducation] = useState<FormalEducation[]>([
        formalEducationEmpty,
    ]);
    const [trainings, setTrainings] = useState<Training[]>([trainingEmpty]);
    const [certifications, setCertifications] = useState<Certification[]>([
        certificationEmpty,
    ]);
    const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
        workEmpty,
    ]);
    const [academicAwards, setAcademicAwards] = useState<Award[]>([awardEmpty]);
    const [communityAwards, setCommunityAwards] = useState<Award[]>([
        awardEmpty,
    ]);
    const [workAwards, setWorkAwards] = useState<Award[]>([awardEmpty]);
    const [creativeWorks, setCreativeWorks] = useState<CreativeWork[]>([
        creativeWorkEmpty,
    ]);
    const [activeSection, setActiveSection] = useState('personal');
    const [idPicturePreviewUrl, setIdPicturePreviewUrl] = useState<
        string | null
    >(null);
    const [checkedDocuments, setCheckedDocuments] = useState<boolean[]>(
        documentChecklist.map(() => false),
    );

    const navItems = useMemo(
        () => [
            ['Personal', 'personal'],
            ['Education', 'education'],
            ['Work', 'work'],
            ['Recognition', 'recognition'],
            ['Lifelong', 'lifelong'],
            ['Documents', 'documents'],
        ],
        [],
    );

    useEffect(() => {
        const sections = navItems
            .map(([, target]) => document.getElementById(target))
            .filter((section): section is HTMLElement => Boolean(section));

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            first.boundingClientRect.top -
                            second.boundingClientRect.top,
                    )[0];

                if (visibleEntry?.target.id) {
                    setActiveSection(visibleEntry.target.id);
                }
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0,
            },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [navItems]);

    useEffect(() => {
        return () => {
            if (idPicturePreviewUrl) {
                URL.revokeObjectURL(idPicturePreviewUrl);
            }
        };
    }, [idPicturePreviewUrl]);

    function handleIdPictureChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        setIdPicturePreviewUrl(file ? URL.createObjectURL(file) : null);
    }

    function updateDocumentChecked(index: number, checked: boolean) {
        setCheckedDocuments((current) =>
            current.map((value, currentIndex) =>
                currentIndex === index ? checked : value,
            ),
        );
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;

        if (!form.checkValidity()) {
            const firstInvalidField = form.querySelector<HTMLElement>(
                'input:invalid, textarea:invalid, select:invalid',
            );

            firstInvalidField?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            firstInvalidField?.focus({ preventScroll: true });

            window.setTimeout(() => {
                form.reportValidity();
            }, 300);

            return;
        }

        const formData = new FormData(form);
        const payload = Object.fromEntries(
            [...formData.entries()].filter(
                ([, value]) => typeof value === 'string',
            ),
        );
        const idPicture = formData.get('id_picture');

        router.post(
            '/registrations',
            {
                ...payload,
                id_picture:
                    idPicture instanceof File && idPicture.size > 0
                        ? idPicture
                        : null,
                formal_education: formalEducation,
                non_formal_education: trainings,
                certifications,
                work_experiences: workExperiences,
                academic_awards: academicAwards,
                community_awards: communityAwards,
                work_awards: workAwards,
                creative_works: creativeWorks,
                documents: documentChecklist.map((document, index) => {
                    const file = formData.get(`document_${index}_file`);

                    return {
                        name: document,
                        checked:
                            checkedDocuments[index] ||
                            (file instanceof File && file.size > 0),
                        file:
                            file instanceof File && file.size > 0 ? file : null,
                    };
                }),
            },
            {
                forceFormData: true,
                onStart: () => setSubmitted(false),
                onSuccess: () => setSubmitted(true),
            },
        );
    }

    return (
        <>
            <Head title="ETEEAP Registration" />
            <div className="min-h-screen bg-background text-foreground">
                <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-muted-foreground">
                                Expanded Tertiary Education Equivalency and
                                Accreditation Program
                            </p>
                            <h1 className="truncate text-xl font-semibold sm:text-2xl">
                                ETEEAP Application Registration
                            </h1>
                        </div>
                        <nav className="flex flex-wrap items-center gap-2">
                            {auth.user && (
                                <>
                                    <Button asChild variant="outline">
                                        <Link href="/registrations">
                                            Registrations
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <Link href={dashboard()}>
                                            Dashboard
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
                    <aside className="lg:sticky lg:top-24 lg:h-fit">
                        <Card className="gap-4 p-4">
                            <CardHeader className="gap-3 px-0 pb-0">
                                <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                    <ClipboardList className="size-5" />
                                </span>
                                <div>
                                    <CardTitle className="text-base">
                                        Application sections
                                    </CardTitle>
                                    <CardDescription>
                                        Based on the CHED ETEEAP form
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <Separator />
                            <div className="grid gap-1">
                                {navItems.map(([label, target]) => (
                                    <a
                                        aria-current={
                                            activeSection === target
                                                ? 'page'
                                                : undefined
                                        }
                                        className={cn(
                                            'rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                            activeSection === target &&
                                                'bg-accent font-medium text-accent-foreground',
                                        )}
                                        href={`#${target}`}
                                        key={target}
                                        onClick={() => setActiveSection(target)}
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </Card>
                    </aside>

                    <Card className="gap-0 py-0">
                        <form
                            className="px-4 py-5 sm:px-6 lg:px-8"
                            noValidate
                            onReset={() => {
                                setSubmitted(false);
                                setIdPicturePreviewUrl(null);
                                setCheckedDocuments(
                                    documentChecklist.map(() => false),
                                );
                            }}
                            onSubmit={handleSubmit}
                        >
                            {submitted && (
                                <div className="mb-5 flex items-start gap-3 rounded-lg border bg-muted p-4">
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                                    <div>
                                        <p className="font-medium">
                                            Application submitted successfully.
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Your ETEEAP registration has been
                                            saved for admin review.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-5 sm:grid-cols-[1fr_180px] sm:items-start">
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        ETEEAP Applicant Profile
                                    </h2>
                                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                                        Complete every applicable field and mark
                                        unavailable information as not
                                        applicable.
                                    </p>
                                </div>
                                <label className="grid aspect-square cursor-pointer place-items-center rounded-lg border-2 border-dashed bg-muted/30 p-4 text-center text-sm transition-colors hover:bg-accent">
                                    {idPicturePreviewUrl ? (
                                        <span className="grid w-full gap-2">
                                            <img
                                                alt="1x1 ID picture preview"
                                                className="aspect-square w-full rounded-md border object-cover"
                                                src={idPicturePreviewUrl}
                                            />
                                            <span className="font-medium">
                                                Change photo
                                            </span>
                                        </span>
                                    ) : (
                                        <>
                                            <Upload className="mb-2 size-7 text-muted-foreground" />
                                            <span className="font-medium">
                                                1x1 ID picture
                                            </span>
                                        </>
                                    )}
                                    <input
                                        accept="image/*"
                                        className="sr-only"
                                        name="id_picture"
                                        onChange={handleIdPictureChange}
                                        type="file"
                                    />
                                </label>
                            </div>

                            <Section
                                icon={<UserRound className="size-5" />}
                                id="personal"
                                title="Personal Information"
                            >
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Field
                                        autoComplete="family-name"
                                        id="last_name"
                                        label="Last name"
                                        required
                                    />
                                    <Field
                                        autoComplete="given-name"
                                        id="first_name"
                                        label="First name"
                                        required
                                    />
                                    <Field
                                        autoComplete="additional-name"
                                        id="middle_name"
                                        label="Middle name"
                                    />
                                </div>
                                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_160px]">
                                    <Field
                                        autoComplete="street-address"
                                        id="address"
                                        label="Address"
                                        required
                                    />
                                    <Field
                                        autoComplete="postal-code"
                                        id="zip_code"
                                        label="Zip code"
                                    />
                                </div>
                                <div className="mt-4 grid gap-4 md:grid-cols-3">
                                    <Field
                                        autoComplete="tel"
                                        id="telephone"
                                        label="Telephone number"
                                        type="tel"
                                    />
                                    <Field
                                        autoComplete="bday"
                                        id="birth_date"
                                        label="Birth date"
                                        type="date"
                                    />
                                    <Field id="birthplace" label="Birthplace" />
                                </div>
                                <div className="mt-4 grid gap-4 md:grid-cols-4">
                                    <SelectField
                                        id="civil_status"
                                        label="Civil status"
                                        options={[
                                            'Single',
                                            'Married',
                                            'Widowed',
                                            'Separated',
                                            'Divorced',
                                        ]}
                                    />
                                    <SelectField
                                        id="sex"
                                        label="Sex"
                                        options={[
                                            'Female',
                                            'Male',
                                            'Prefer not to say',
                                        ]}
                                    />
                                    <Field
                                        id="nationality"
                                        label="Nationality"
                                    />
                                    <Field
                                        id="languages"
                                        label="Languages and dialects"
                                    />
                                </div>
                                <div className="mt-4 grid gap-4 md:grid-cols-3">
                                    <Field
                                        id="first_priority"
                                        label="First priority degree"
                                        required
                                    />
                                    <Field
                                        id="second_priority"
                                        label="Second priority degree"
                                    />
                                    <Field
                                        id="third_priority"
                                        label="Third priority degree"
                                    />
                                </div>
                                <div className="mt-4 grid gap-4">
                                    <TextareaField
                                        id="application_goals"
                                        label="Goals, objectives, or purpose for applying"
                                        required
                                        rows={5}
                                    />
                                    <TextareaField
                                        id="learning_time_plan"
                                        label="Time planned for personal learning activities"
                                        rows={4}
                                    />
                                    <TextareaField
                                        id="overseas_accreditation_plan"
                                        label="Overseas applicant accreditation plan"
                                        rows={4}
                                    />
                                </div>
                                <fieldset className="mt-5">
                                    <legend className="mb-3 text-sm font-medium">
                                        Target completion timeline
                                    </legend>
                                    <div className="grid gap-2 sm:grid-cols-4">
                                        {[
                                            'Less than 1 year',
                                            '1 year',
                                            '2 years',
                                            '3 years',
                                        ].map((timeline) => (
                                            <label
                                                className="flex min-h-11 items-center gap-3 rounded-md border bg-muted/30 px-3 text-sm"
                                                key={timeline}
                                            >
                                                <input
                                                    className="size-4 accent-primary"
                                                    name="completion_timeline"
                                                    type="radio"
                                                    value={timeline}
                                                />
                                                {timeline}
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </Section>

                            <Section
                                icon={<GraduationCap className="size-5" />}
                                id="education"
                                title="Education and Certifications"
                            >
                                <div className="space-y-8">
                                    <Repeater
                                        description="Formal education entries from schools or degree programs."
                                        emptyItem={formalEducationEmpty}
                                        items={formalEducation}
                                        renderItem={(item, index, update) => (
                                            <div className="grid gap-4 md:grid-cols-4">
                                                <ControlledInput
                                                    id={`formal_course_${index}`}
                                                    label="Course or degree program"
                                                    onChange={(course) =>
                                                        update({
                                                            ...item,
                                                            course,
                                                        })
                                                    }
                                                    value={item.course}
                                                />
                                                <ControlledInput
                                                    id={`formal_school_${index}`}
                                                    label="School and address"
                                                    onChange={(school) =>
                                                        update({
                                                            ...item,
                                                            school,
                                                        })
                                                    }
                                                    value={item.school}
                                                />
                                                <ControlledInput
                                                    id={`formal_date_from_${index}`}
                                                    label="From"
                                                    onChange={(date_from) =>
                                                        update({
                                                            ...item,
                                                            date_from,
                                                        })
                                                    }
                                                    type="date"
                                                    value={item.date_from}
                                                />
                                                <ControlledInput
                                                    id={`formal_date_to_${index}`}
                                                    label="To"
                                                    onChange={(date_to) =>
                                                        update({
                                                            ...item,
                                                            date_to,
                                                        })
                                                    }
                                                    type="date"
                                                    value={item.date_to}
                                                />
                                            </div>
                                        )}
                                        setItems={setFormalEducation}
                                        title="Formal Education"
                                    />

                                    <Repeater
                                        description="Structured trainings, workshops, and short-term learning programs."
                                        emptyItem={trainingEmpty}
                                        items={trainings}
                                        renderItem={(item, index, update) => (
                                            <div className="grid gap-4 md:grid-cols-4">
                                                <ControlledInput
                                                    id={`training_title_${index}`}
                                                    label="Training program"
                                                    onChange={(title) =>
                                                        update({
                                                            ...item,
                                                            title,
                                                        })
                                                    }
                                                    value={item.title}
                                                />
                                                <ControlledInput
                                                    id={`training_certificate_${index}`}
                                                    label="Certificate obtained"
                                                    onChange={(certificate) =>
                                                        update({
                                                            ...item,
                                                            certificate,
                                                        })
                                                    }
                                                    value={item.certificate}
                                                />
                                                <ControlledInput
                                                    id={`training_date_from_${index}`}
                                                    label="From"
                                                    onChange={(date_from) =>
                                                        update({
                                                            ...item,
                                                            date_from,
                                                        })
                                                    }
                                                    type="date"
                                                    value={item.date_from}
                                                />
                                                <ControlledInput
                                                    id={`training_date_to_${index}`}
                                                    label="To"
                                                    onChange={(date_to) =>
                                                        update({
                                                            ...item,
                                                            date_to,
                                                        })
                                                    }
                                                    type="date"
                                                    value={item.date_to}
                                                />
                                            </div>
                                        )}
                                        setItems={setTrainings}
                                        title="Non-Formal Education"
                                    />

                                    <Repeater
                                        description="Vocational, licensure, proficiency, or other certification examinations."
                                        emptyItem={certificationEmpty}
                                        items={certifications}
                                        renderItem={(item, index, update) => (
                                            <div className="grid gap-4 md:grid-cols-4">
                                                <ControlledInput
                                                    id={`certification_title_${index}`}
                                                    label="Certification examination"
                                                    onChange={(title) =>
                                                        update({
                                                            ...item,
                                                            title,
                                                        })
                                                    }
                                                    value={item.title}
                                                />
                                                <ControlledInput
                                                    id={`certification_agency_${index}`}
                                                    label="Certifying agency"
                                                    onChange={(agency) =>
                                                        update({
                                                            ...item,
                                                            agency,
                                                        })
                                                    }
                                                    value={item.agency}
                                                />
                                                <ControlledInput
                                                    id={`certification_date_${index}`}
                                                    label="Date certified"
                                                    onChange={(certifiedDate) =>
                                                        update({
                                                            ...item,
                                                            certifiedDate,
                                                        })
                                                    }
                                                    type="date"
                                                    value={item.certifiedDate}
                                                />
                                                <ControlledInput
                                                    id={`certification_rating_${index}`}
                                                    label="Rating"
                                                    onChange={(rating) =>
                                                        update({
                                                            ...item,
                                                            rating,
                                                        })
                                                    }
                                                    value={item.rating}
                                                />
                                            </div>
                                        )}
                                        setItems={setCertifications}
                                        title="Other Certification Examinations"
                                    />
                                </div>
                            </Section>

                            <Section
                                icon={<BriefcaseBusiness className="size-5" />}
                                id="work"
                                title="Paid Work and Other Experiences"
                            >
                                <Repeater
                                    emptyItem={workEmpty}
                                    items={workExperiences}
                                    renderItem={(item, index, update) => (
                                        <div className="grid gap-4">
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <ControlledInput
                                                    id={`work_post_${index}`}
                                                    label="Post or designation"
                                                    onChange={(post) =>
                                                        update({
                                                            ...item,
                                                            post,
                                                        })
                                                    }
                                                    value={item.post}
                                                />
                                                <ControlledInput
                                                    id={`work_date_from_${index}`}
                                                    label="Employment from"
                                                    onChange={(date_from) =>
                                                        update({
                                                            ...item,
                                                            date_from,
                                                        })
                                                    }
                                                    type="date"
                                                    value={item.date_from}
                                                />
                                                <ControlledInput
                                                    id={`work_date_to_${index}`}
                                                    label="Employment to"
                                                    onChange={(date_to) =>
                                                        update({
                                                            ...item,
                                                            date_to,
                                                        })
                                                    }
                                                    type="date"
                                                    value={item.date_to}
                                                />
                                                <ControlledInput
                                                    id={`work_company_${index}`}
                                                    label="Company name and address"
                                                    onChange={(company) =>
                                                        update({
                                                            ...item,
                                                            company,
                                                        })
                                                    }
                                                    value={item.company}
                                                />
                                                <ControlledInput
                                                    id={`work_status_${index}`}
                                                    label="Terms or status of employment"
                                                    onChange={(status) =>
                                                        update({
                                                            ...item,
                                                            status,
                                                        })
                                                    }
                                                    value={item.status}
                                                />
                                                <ControlledInput
                                                    id={`work_supervisor_${index}`}
                                                    label="Immediate supervisor"
                                                    onChange={(supervisor) =>
                                                        update({
                                                            ...item,
                                                            supervisor,
                                                        })
                                                    }
                                                    value={item.supervisor}
                                                />
                                                <ControlledInput
                                                    id={`work_references_${index}`}
                                                    label="Self-employment references"
                                                    onChange={(references) =>
                                                        update({
                                                            ...item,
                                                            references,
                                                        })
                                                    }
                                                    value={item.references}
                                                />
                                            </div>
                                            <ControlledTextarea
                                                id={`work_reason_${index}`}
                                                label="Reason for moving to the next job"
                                                onChange={(reason) =>
                                                    update({ ...item, reason })
                                                }
                                                value={item.reason}
                                            />
                                            <ControlledTextarea
                                                id={`work_responsibilities_${index}`}
                                                label="Actual functions and responsibilities"
                                                onChange={(responsibilities) =>
                                                    update({
                                                        ...item,
                                                        responsibilities,
                                                    })
                                                }
                                                rows={5}
                                                value={item.responsibilities}
                                            />
                                        </div>
                                    )}
                                    setItems={setWorkExperiences}
                                    title="Work Experience"
                                />
                            </Section>

                            <Section
                                icon={<FileCheck2 className="size-5" />}
                                id="recognition"
                                title="Honors, Awards, Citations, and Creative Works"
                            >
                                <div className="space-y-8">
                                    {[
                                        {
                                            title: 'Academic Awards',
                                            items: academicAwards,
                                            setItems: setAcademicAwards,
                                        },
                                        {
                                            title: 'Community and Civic Awards',
                                            items: communityAwards,
                                            setItems: setCommunityAwards,
                                        },
                                        {
                                            title: 'Work Related Awards',
                                            items: workAwards,
                                            setItems: setWorkAwards,
                                        },
                                    ].map(({ title, items, setItems }) => (
                                        <Repeater
                                            emptyItem={awardEmpty}
                                            items={items}
                                            key={title}
                                            renderItem={(
                                                item,
                                                index,
                                                update,
                                            ) => (
                                                <div className="grid gap-4 md:grid-cols-3">
                                                    <ControlledInput
                                                        id={`${title}_${index}_award`}
                                                        label="Award conferred"
                                                        onChange={(award) =>
                                                            update({
                                                                ...item,
                                                                award,
                                                            })
                                                        }
                                                        value={item.award}
                                                    />
                                                    <ControlledInput
                                                        id={`${title}_${index}_organization`}
                                                        label="Conferring organization"
                                                        onChange={(
                                                            organization,
                                                        ) =>
                                                            update({
                                                                ...item,
                                                                organization,
                                                            })
                                                        }
                                                        value={
                                                            item.organization
                                                        }
                                                    />
                                                    <ControlledInput
                                                        id={`${title}_${index}_date`}
                                                        label="Date awarded"
                                                        onChange={(date) =>
                                                            update({
                                                                ...item,
                                                                date,
                                                            })
                                                        }
                                                        type="date"
                                                        value={item.date}
                                                    />
                                                </div>
                                            )}
                                            setItems={setItems}
                                            title={title}
                                        />
                                    ))}

                                    <Repeater
                                        description="Inventions, writings, art, sports, cultural work, competitions, prizes, and other accomplishments."
                                        emptyItem={creativeWorkEmpty}
                                        items={creativeWorks}
                                        renderItem={(item, index, update) => (
                                            <div className="grid gap-4">
                                                <ControlledTextarea
                                                    id={`creative_description_${index}`}
                                                    label="Description"
                                                    onChange={(description) =>
                                                        update({
                                                            ...item,
                                                            description,
                                                        })
                                                    }
                                                    value={item.description}
                                                />
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <ControlledInput
                                                        id={`creative_date_${index}`}
                                                        label="Date accomplished"
                                                        onChange={(date) =>
                                                            update({
                                                                ...item,
                                                                date,
                                                            })
                                                        }
                                                        type="date"
                                                        value={item.date}
                                                    />
                                                    <ControlledInput
                                                        id={`creative_attesting_${index}`}
                                                        label="Publishing agency or attesting organization"
                                                        onChange={(
                                                            attestingOrganization,
                                                        ) =>
                                                            update({
                                                                ...item,
                                                                attestingOrganization,
                                                            })
                                                        }
                                                        value={
                                                            item.attestingOrganization
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        setItems={setCreativeWorks}
                                        title="Creative Works and Special Accomplishments"
                                    />
                                </div>
                            </Section>

                            <Section
                                icon={<ClipboardList className="size-5" />}
                                id="lifelong"
                                title="Lifelong Learning Experience"
                            >
                                <div className="grid gap-4">
                                    <TextareaField
                                        id="hobbies"
                                        label="Hobbies and leisure activities"
                                        rows={4}
                                    />
                                    <TextareaField
                                        id="special_skills"
                                        label="Special skills related to the field of study"
                                        rows={4}
                                    />
                                    <TextareaField
                                        id="work_related_learning"
                                        label="Work-related learning activities"
                                        rows={4}
                                    />
                                    <TextareaField
                                        id="volunteer_activities"
                                        label="Volunteer activities"
                                        rows={4}
                                    />
                                    <TextareaField
                                        id="travels"
                                        label="Travels, places visited, purpose, and learning obtained"
                                        rows={4}
                                    />
                                    <TextareaField
                                        id="degree_contribution_essay"
                                        label="Essay on how earning a degree will contribute to personal development, community, workplace, society, and country"
                                        required
                                        rows={8}
                                    />
                                </div>
                            </Section>

                            <Section
                                icon={<CheckCircle2 className="size-5" />}
                                id="documents"
                                title="Required Documents"
                            >
                                <div className="rounded-lg border bg-muted/30 p-4">
                                    <h3 className="font-medium">
                                        Required Documents
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Upload image or PDF files only.
                                    </p>
                                    <div className="mt-4 grid gap-3">
                                        {documentChecklist.map(
                                            (document, index) => (
                                                <label
                                                    className="grid gap-3 rounded-md border bg-background p-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center"
                                                    key={document}
                                                >
                                                    <span className="flex items-start gap-3 text-sm">
                                                        <Checkbox
                                                            checked={
                                                                checkedDocuments[
                                                                    index
                                                                ]
                                                            }
                                                            className="mt-1"
                                                            name={`document_${index}_checked`}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                updateDocumentChecked(
                                                                    index,
                                                                    checked ===
                                                                        true,
                                                                )
                                                            }
                                                        />
                                                        {document}
                                                    </span>
                                                    <Input
                                                        accept="image/*,application/pdf"
                                                        className={fieldClass}
                                                        name={`document_${index}_file`}
                                                        onChange={(event) => {
                                                            if (
                                                                event.target
                                                                    .files?.[0]
                                                            ) {
                                                                updateDocumentChecked(
                                                                    index,
                                                                    true,
                                                                );
                                                            }
                                                        }}
                                                        type="file"
                                                    />
                                                </label>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </Section>

                            <div className="sticky bottom-0 -mx-4 flex flex-col gap-3 border-t bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:flex-row sm:justify-end sm:px-6 lg:-mx-8 lg:px-8">
                                <Button
                                    className="w-full sm:w-auto"
                                    type="reset"
                                    variant="outline"
                                >
                                    <RotateCcw />
                                    Reset
                                </Button>
                                <Button
                                    className="w-full sm:w-auto"
                                    type="submit"
                                >
                                    <Save />
                                    Submit Application
                                </Button>
                            </div>
                        </form>
                    </Card>
                </main>
            </div>
        </>
    );
}
