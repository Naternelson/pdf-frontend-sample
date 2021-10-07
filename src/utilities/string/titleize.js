import humanizeString from "humanize-string";
import titleize from 'titleize';

export default function titleFor(str){
    return titleize(humanizeString(str))
}