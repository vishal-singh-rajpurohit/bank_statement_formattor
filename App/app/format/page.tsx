"use client";

import React from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    FileCheck2,
    FileText,
    LoaderCircle,
    LockKeyhole,
    RefreshCw,
    Send,
    UploadCloud,
} from "lucide-react";

import api from "@/config/api_axios";
import { actionDetailsSchema, ActionDetailsFormErrors, ActionDetailsFormValues } from "@/types/action_inputs";
import { Api_Action_Complete, Api_Action_Initiate, Api_Action_Upload } from "@/types/api_resp";
import { toggleToastOpen } from "@/store/functions/ui";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";

type WorkflowStep = 1 | 2 | 3;
type LoadingState = "upload" | "initiate" | "complete" | null;

const initialActionDetails: ActionDetailsFormValues = {
    bank_name: "",
    tally_name: "",
    voucher_name: "",
    password: "",
};

const bankOptions = [
    { value: "AU", label: "AU Small Finance Bank" },
    { value: "KOTAK", label: "Kotak Mahindra Bank" },
];

function getApiErrorMessage(error: unknown, fallback: string) {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as {
            detail?: string | { message?: string };
            message?: string;
        } | undefined;

        if (typeof data?.detail === "string") return data.detail;
        if (data?.detail?.message) return data.detail.message;
        if (data?.message) return data.message;
    }

    return fallback;
}

function getFileError(file: File | null) {
    if (!file) return "Upload a bank statement PDF";

    const hasPdfExtension = file.name.toLowerCase().endsWith(".pdf");
    const hasPdfMimeType = file.type === "application/pdf";

    if (!hasPdfExtension || !hasPdfMimeType) {
        return "Only PDF bank statements are supported";
    }

    return "";
}

function StepBadge({
    step,
    title,
    description,
    activeStep,
    completed,
}: {
    step: WorkflowStep;
    title: string;
    description: string;
    activeStep: WorkflowStep;
    completed: boolean;
}) {
    const isActive = activeStep === step;

    return (
        <div
            className={`flex gap-4 rounded-2xl border p-4 transition ${
                completed
                    ? "border-emerald-200 bg-emerald-50"
                    : isActive
                        ? "border-blue-200 bg-blue-50"
                        : "border-slate-200 bg-white"
            }`}
        >
            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    completed
                        ? "bg-emerald-600 text-white"
                        : isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                }`}
            >
                {completed ? <CheckCircle2 className="h-5 w-5" /> : step}
            </div>
            <div>
                <h2 className="text-base font-semibold text-slate-950">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
            </div>
        </div>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-2 text-sm text-red-600">{message}</p>;
}

function StatusMessage({
    type,
    message,
}: {
    type: "success" | "error" | "info";
    message: string;
}) {
    const styles = {
        success: "border-emerald-200 bg-emerald-50 text-emerald-800",
        error: "border-red-200 bg-red-50 text-red-700",
        info: "border-blue-200 bg-blue-50 text-blue-800",
    };

    const Icon = type === "success" ? CheckCircle2 : type === "error" ? AlertCircle : FileText;

    return (
        <div className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${styles[type]}`}>
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="leading-6">{message}</p>
        </div>
    );
}

export default function FormatPage() {
    const dispatch = useAppDispatch();
    const authEmail = useAppSelector((state) => state.auth.email);

    const [activeStep, setActiveStep] = React.useState<WorkflowStep>(1);
    const [statementFile, setStatementFile] = React.useState<File | null>(null);
    const [fileError, setFileError] = React.useState("");
    const [actionDetails, setActionDetails] = React.useState<ActionDetailsFormValues>(initialActionDetails);
    const [actionErrors, setActionErrors] = React.useState<ActionDetailsFormErrors>({});
    const [uploadInfo, setUploadInfo] = React.useState<Api_Action_Upload | null>(null);
    const [actionInfo, setActionInfo] = React.useState<Api_Action_Initiate | null>(null);
    const [completeResult, setCompleteResult] = React.useState<Api_Action_Complete | null>(null);
    const [loading, setLoading] = React.useState<LoadingState>(null);
    const [stepError, setStepError] = React.useState("");

    const isLoggedIn = Boolean(authEmail);
    const isUploading = loading === "upload";
    const isInitiating = loading === "initiate";
    const isCompleting = loading === "complete";

    const showToast = React.useCallback(
        (toastMessage: string, toastType: "success" | "error") => {
            dispatch(toggleToastOpen({
                data: {
                    toastMessage,
                    toastOpen: true,
                    toastType,
                },
            }));
        },
        [dispatch]
    );

    const resetDownstreamState = React.useCallback(() => {
        setUploadInfo(null);
        setActionInfo(null);
        setCompleteResult(null);
        setActionErrors({});
        setStepError("");
        setActiveStep(1);
    }, []);

    const handleFileSelect = React.useCallback(
        (file: File | null) => {
            setStatementFile(file);
            setFileError(file ? getFileError(file) : "");
            resetDownstreamState();
        },
        [resetDownstreamState]
    );

    const handleDrop = React.useCallback(
        (event: React.DragEvent<HTMLLabelElement>) => {
            event.preventDefault();
            const file = event.dataTransfer.files.item(0);
            handleFileSelect(file);
        },
        [handleFileSelect]
    );

    const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationMessage = getFileError(statementFile);
        if (validationMessage) {
            setFileError(validationMessage);
            return;
        }

        if (!statementFile) return;

        const payload = new FormData();
        payload.append("file", statementFile);

        setLoading("upload");
        setStepError("");

        try {
            const resp: AxiosResponse<Api_Action_Upload> = await api.post("/actions/upload-statement", payload, {
                withCredentials: true,
            });

            setUploadInfo(resp.data);
            setActionInfo(null);
            setCompleteResult(null);
            setActiveStep(2);
            showToast("Statement uploaded", "success");
        } catch (error) {
            const message = getApiErrorMessage(error, "Unable to upload statement");
            setStepError(message);
            showToast(message, "error");
        } finally {
            setLoading(null);
        }
    };

    const handleActionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const key = name as keyof ActionDetailsFormValues;

        setActionDetails((prev) => ({ ...prev, [key]: value }));
        setActionErrors((prev) => ({ ...prev, [key]: undefined }));
        setStepError("");
    };

    const handleInitiateAction = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!uploadInfo) {
            setStepError("Upload a statement before submitting action details");
            setActiveStep(1);
            return;
        }

        const result = actionDetailsSchema.safeParse(actionDetails);

        if (!result.success) {
            const fieldErrors: ActionDetailsFormErrors = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof ActionDetailsFormValues;
                if (!fieldErrors[key]) fieldErrors[key] = issue.message;
            });
            setActionErrors(fieldErrors);
            return;
        }

        setLoading("initiate");
        setStepError("");

        try {
            const resp: AxiosResponse<Api_Action_Initiate> = await api.post("/actions/initiate-action", result.data, {
                withCredentials: true,
            });

            setActionInfo(resp.data);
            setCompleteResult(null);
            setActiveStep(3);
            showToast("Action details saved", "success");
        } catch (error) {
            const message = getApiErrorMessage(error, "Unable to initiate action");
            setStepError(message);
            showToast(message, "error");
        } finally {
            setLoading(null);
        }
    };

    const handleCompleteAction = async () => {
        if (!actionInfo) {
            setStepError("Submit action details before completing the action");
            setActiveStep(uploadInfo ? 2 : 1);
            return;
        }

        setLoading("complete");
        setStepError("");

        try {
            const resp: AxiosResponse<Api_Action_Complete> = await api.post("/actions/complete-action", {}, {
                withCredentials: true,
            });

            setCompleteResult(resp.data);
            setActiveStep(3);
            showToast("Action completed", "success");
        } catch (error) {
            const message = getApiErrorMessage(error, "Unable to complete action");
            setStepError(message);
            showToast(message, "error");
        } finally {
            setLoading(null);
        }
    };

    const resetWorkflow = () => {
        setStatementFile(null);
        setFileError("");
        setActionDetails(initialActionDetails);
        resetDownstreamState();
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Format Action</p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Convert a statement into Tally-ready output
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                        <FileCheck2 className="h-5 w-5 text-blue-600" />
                        <span>{uploadInfo ? `Operation #${uploadInfo.operation_id}` : "No active operation"}</span>
                    </div>
                </div>

                {!isLoggedIn ? (
                    <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0" />
                            <p className="leading-6">Sign in before starting this workflow.</p>
                        </div>
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center justify-center rounded-xl bg-amber-900 px-4 py-2 font-semibold text-white transition hover:bg-amber-800"
                        >
                            Sign in
                        </Link>
                    </div>
                ) : null}

                <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
                    <aside className="space-y-4">
                        <StepBadge
                            step={1}
                            title="Upload Statement"
                            description="Add the PDF statement for this conversion."
                            activeStep={activeStep}
                            completed={Boolean(uploadInfo)}
                        />
                        <StepBadge
                            step={2}
                            title="Initiate Action"
                            description="Enter the bank and Tally details."
                            activeStep={activeStep}
                            completed={Boolean(actionInfo)}
                        />
                        <StepBadge
                            step={3}
                            title="Complete Action"
                            description="Generate the XML and send it by email."
                            activeStep={activeStep}
                            completed={Boolean(completeResult)}
                        />
                    </aside>

                    <div className="space-y-6">
                        {stepError ? <StatusMessage type="error" message={stepError} /> : null}

                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-950">1. Upload Statement</h2>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">PDF statement</p>
                                </div>
                                {uploadInfo ? <span className="text-sm font-semibold text-emerald-700">Uploaded</span> : null}
                            </div>

                            <form onSubmit={handleUpload} className="mt-5 space-y-4">
                                <label
                                    onDragOver={(event) => event.preventDefault()}
                                    onDrop={handleDrop}
                                    className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-8 text-center transition ${
                                        fileError ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50 hover:border-blue-300 hover:bg-blue-50"
                                    }`}
                                >
                                    <UploadCloud className="h-10 w-10 text-blue-600" />
                                    <span className="mt-3 text-base font-semibold text-slate-900">
                                        {statementFile ? statementFile.name : "Choose PDF statement"}
                                    </span>
                                    <span className="mt-1 text-sm text-slate-500">PDF only</span>
                                    <input
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        className="sr-only"
                                        onChange={(event) => handleFileSelect(event.target.files?.item(0) ?? null)}
                                        disabled={isUploading}
                                    />
                                </label>
                                <FieldError message={fileError} />

                                {uploadInfo ? <StatusMessage type="success" message={`${uploadInfo.filename} is ready for action details.`} /> : null}

                                <button
                                    type="submit"
                                    disabled={!isLoggedIn || !statementFile || isUploading}
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
                                >
                                    {isUploading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
                                    {isUploading ? "Uploading" : uploadInfo ? "Upload another statement" : "Upload statement"}
                                </button>
                            </form>
                        </section>

                        <section className={`rounded-2xl border bg-white p-5 shadow-sm sm:p-6 ${uploadInfo ? "border-slate-200" : "border-slate-200 opacity-70"}`}>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-950">2. Initiate Action</h2>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">Bank and Tally details</p>
                                </div>
                                {actionInfo ? <span className="text-sm font-semibold text-emerald-700">Details saved</span> : null}
                            </div>

                            <form onSubmit={handleInitiateAction} className="mt-5 grid gap-5 md:grid-cols-2" noValidate>
                                <div>
                                    <label htmlFor="bank_name" className="block text-sm font-semibold text-slate-700">
                                        Bank
                                    </label>
                                    <select
                                        id="bank_name"
                                        name="bank_name"
                                        value={actionDetails.bank_name}
                                        onChange={handleActionChange}
                                        disabled={!uploadInfo || isInitiating}
                                        className={`mt-2 h-12 w-full rounded-xl border bg-white px-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 ${
                                            actionErrors.bank_name ? "border-red-300" : "border-slate-200"
                                        }`}
                                    >
                                        <option value="">Select bank</option>
                                        {bankOptions.map((bank) => (
                                            <option key={bank.value} value={bank.value}>
                                                {bank.label}
                                            </option>
                                        ))}
                                    </select>
                                    <FieldError message={actionErrors.bank_name} />
                                </div>

                                <div>
                                    <label htmlFor="tally_name" className="block text-sm font-semibold text-slate-700">
                                        Tally company name
                                    </label>
                                    <input
                                        id="tally_name"
                                        name="tally_name"
                                        type="text"
                                        value={actionDetails.tally_name}
                                        onChange={handleActionChange}
                                        disabled={!uploadInfo || isInitiating}
                                        placeholder="Company name in Tally"
                                        className={`mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 ${
                                            actionErrors.tally_name ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                                        }`}
                                    />
                                    <FieldError message={actionErrors.tally_name} />
                                </div>

                                <div>
                                    <label htmlFor="voucher_name" className="block text-sm font-semibold text-slate-700">
                                        Ledger/output name
                                    </label>
                                    <input
                                        id="voucher_name"
                                        name="voucher_name"
                                        type="text"
                                        value={actionDetails.voucher_name}
                                        onChange={handleActionChange}
                                        disabled={!uploadInfo || isInitiating}
                                        placeholder="Bank ledger or output label"
                                        className={`mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 ${
                                            actionErrors.voucher_name ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                                        }`}
                                    />
                                    <FieldError message={actionErrors.voucher_name} />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                                        PDF password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={actionDetails.password ?? ""}
                                        onChange={handleActionChange}
                                        disabled={!uploadInfo || isInitiating}
                                        placeholder="Required only for encrypted PDFs"
                                        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                {actionInfo ? (
                                    <div className="md:col-span-2">
                                        <StatusMessage type="success" message={`Action #${actionInfo.operation_id} is ready to complete for ${actionInfo.bank_name}.`} />
                                    </div>
                                ) : null}

                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={!uploadInfo || isInitiating}
                                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                    >
                                        {isInitiating ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                                        {isInitiating ? "Submitting" : actionInfo ? "Update details" : "Submit details"}
                                    </button>
                                </div>
                            </form>
                        </section>

                        <section className={`rounded-2xl border bg-white p-5 shadow-sm sm:p-6 ${actionInfo ? "border-slate-200" : "border-slate-200 opacity-70"}`}>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-950">3. Complete Action</h2>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">Final status</p>
                                </div>
                                {completeResult ? <span className="text-sm font-semibold text-emerald-700">Completed</span> : null}
                            </div>

                            <div className="mt-5 space-y-4">
                                {completeResult ? (
                                    <StatusMessage
                                        type="success"
                                        message={`${completeResult.output_file} has been generated and sent by ${completeResult.delivery}.`}
                                    />
                                ) : actionInfo ? (
                                    <StatusMessage type="info" message="Review the details above, then complete the action." />
                                ) : (
                                    <StatusMessage type="info" message="Submit action details before completing this workflow." />
                                )}

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={handleCompleteAction}
                                        disabled={!actionInfo || isCompleting || Boolean(completeResult)}
                                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                                    >
                                        {isCompleting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                                        {isCompleting ? "Completing" : "Complete action"}
                                    </button>

                                    {completeResult ? (
                                        <button
                                            type="button"
                                            onClick={resetWorkflow}
                                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                                        >
                                            <RefreshCw className="h-5 w-5" />
                                            Start new action
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
