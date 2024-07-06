"use client";

import { useBalance } from "@repo/store/useBalance";

export default function () {
    const balance = useBalance();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            hi there {balance}
        </div>
    )
}