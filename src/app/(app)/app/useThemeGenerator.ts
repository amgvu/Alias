import { useState } from "react";
import { Member } from "@/types/types";
import { categoryItems } from "@/lib/data";
import { characterGen, getSortedMembers } from "@/lib/utilities";
import { toast } from "sonner";

export const useThemeGenerator = (
  members: Member[],
  setMembers: (members: Member[]) => void,
  selectedUserIds: string[]
) => {
  const [theme, setTheme] = useState<string>("");
  const [category, setCategory] = useState<string>("Fictional Characters");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [generatedThemes, setGeneratedThemes] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateCharacters = async (selectedMembers: Member[]) => {
    if (!selectedMembers || selectedMembers.length === 0) {
      toast("No members selected.");
      return;
    }

    if (!theme.trim()) {
      toast("Please enter a theme.");
      return;
    }

    setLoading(true);
    try {
      const numCharacters = selectedMembers.length;
      const characters = await characterGen(theme, category, numCharacters);
      setGeneratedThemes(characters);

      const generatedNames = characters.split(",").map((name) => name.trim());

      const { grouped, sortedRoles } = getSortedMembers(selectedMembers);

      const sortedSelectedMembers = sortedRoles.flatMap(
        (roleName) => grouped[roleName]
      );

      const nicknameMapping: { [key: string]: string } = {};
      sortedSelectedMembers.forEach((member, index) => {
        nicknameMapping[member.user_id] =
          generatedNames[index] || member.nickname;
      });

      const updatedMembers = members.map((member) => {
        if (nicknameMapping[member.user_id]) {
          return {
            ...member,
            nickname: nicknameMapping[member.user_id],
          };
        }
        return member;
      });

      setMembers(updatedMembers);
    } catch (error) {
      console.error("Failed to generate themes:", error);
      toast("Failed to generate themes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (!selectedUserIds || selectedUserIds.length === 0) return;
    const selectedMembers = members.filter((member) =>
      selectedUserIds.includes(member.user_id)
    );
    handleGenerateCharacters(selectedMembers);
  };

  const randomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categoryItems.length);
    setCategory(categoryItems[randomIndex].id);
  };

  return {
    category,
    categoryItems,
    setCategory,
    theme,
    setTheme,
    loading,
    handleGenerate,
    randomCategory,
    handleGenerateCharacters,
  };
};
