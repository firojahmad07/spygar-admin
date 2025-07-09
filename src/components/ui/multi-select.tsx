'use client';

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
    value: string;
    label: string;
}

interface MultiSelectInputProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export function MultiSelectInput({
    options,
    value,
    onChange,
    placeholder = 'Select...',
}: MultiSelectInputProps) {
    const [open, setOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const toggleValue = (val: string) => {
        onChange(
            value.includes(val)
                ? value.filter((v) => v !== val)
                : [...value, val]
        );
    };

    const handleRemove = (val: string) => {
        onChange(value.filter((v) => v !== val));
    };

    const selectedOptions = options.filter((opt) => value.includes(opt.value));

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <div
                    onClick={() => setOpen(true)}
                    className={cn(
                        'flex flex-wrap items-center gap-1 w-full min-h-[2.5rem] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm cursor-pointer focus-within:ring-2 focus-within:ring-ring'
                    )}
                >
                    {selectedOptions.map((opt) => (
                        <div
                            key={opt.value}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-muted text-muted-foreground rounded-sm"
                        >
                            {opt.label}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(opt.value);
                                }}
                            >
                                <X className="h-3 w-3 opacity-50 hover:opacity-100" />
                            </button>
                        </div>
                    ))}

                    <input
                        ref={inputRef}
                        placeholder={value.length === 0 ? placeholder : ''}
                        className="flex-1 min-w-[40px] bg-transparent border-none focus:outline-none text-sm"
                        onFocus={() => setOpen(true)}
                        readOnly
                    />

                    <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
                </div>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className="z-50 w-[200px] mt-1 rounded-md border bg-popover p-1 shadow-md"
                    align="start"
                >
                    <ul className="max-h-60 overflow-y-auto space-y-0.5">
                        {options.map((opt) => {
                            const isSelected = value.includes(opt.value);
                            return (
                                <li
                                    key={opt.value}
                                    onClick={() => toggleValue(opt.value)}
                                    className={cn(
                                        'cursor-pointer px-3 py-1.5 text-sm rounded-md hover:bg-accent',
                                        isSelected
                                            ? 'bg-accent text-accent-foreground font-medium'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {opt.label}
                                </li>
                            );
                        })}
                    </ul>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
