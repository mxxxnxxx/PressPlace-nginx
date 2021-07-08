import React, { useEffect, useState } from 'react';
import { useFormContext } from "react-hook-form";
import TagsForm from '../../components/molecules/TagsForm';
import { Place } from '../../types/Place';
type Props = {
    oldPlace?: Place
}

const EnhancedTagsForm: React.FC<Props> = ({ oldPlace }) => {

    const [tags, setTags] = useState(["tag.0"]);

    const addTag = () => {
        if (tags.length > 4) {
            return
        }
        const newTags = [...tags];
        newTags.push(`tag.${(tags.length)}`);
        setTags(newTags);
    }



    const removeTag = () => {
        if (tags.length > 1) {
            const rmTags = [...tags];
            // popでtagFormから一番末尾の1つだけ削除している
            rmTags.pop()
            setTags(rmTags);
        }
    }

    useEffect(
        () => {
            if (oldPlace) {
                const tagsLength = oldPlace.tags.length - 1;
                for (let i = 0; i < tagsLength; i++) {
                    setTags((tags) => {
                        const newTags = [...tags];
                        newTags.push(`tag.${(tags.length)}`);
                        return newTags
                    });
                }
            }
        }, [])

    return (
        <TagsForm
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
        />
    )


}
export default EnhancedTagsForm