//UTILISE TAILWIND, il faut installer next-ui et préciser le tout dans le tailwind config.js. pour plus d'informations go sur le site de next ui

import React from "react";
import {Calendar} from "@nextui-org/calendar";
import {parseDate} from '@internationalized/date';

export default function test() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    return (
        <>
            <div className="flex gap-x-4">
                <Calendar aria-label="Date (No Selection)" defaultValue={parseDate(formattedDate)}/>
            </div>
        </>
    );
}