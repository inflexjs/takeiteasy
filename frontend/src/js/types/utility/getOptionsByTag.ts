import {TagPropsType} from "@/js/types/utility/helpers";
import {PartialRecord} from "@/js/types/utility/other";

export default function (tag: TagPropsType, href?: string): PartialRecord<TagPropsType, PartialRecord<string, unknown>> {
    const optionsMap: PartialRecord<TagPropsType, PartialRecord<string, unknown>> = {
        button: {
            role: 'button',
            type: 'button'
        },
        a: {
            href,
            rel: 'noopener noreferrer',
            target: '_blank'
        }
    }

    return optionsMap[tag] as PartialRecord<TagPropsType, PartialRecord<string, unknown>>
}