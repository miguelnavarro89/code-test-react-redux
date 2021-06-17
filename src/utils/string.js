import { compose, replace, toLower } from "ramda"

export const makeSlug = compose(
    encodeURI,
    replace(' ', ''),
    toLower,
)