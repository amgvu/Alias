import { useState } from "react";
import { Member, Category } from "@/types/types";
import { characterGen } from "@/lib/utilities/gemini/characters";
import { Users, Globe, Package, MapPin, Brain } from "lucide-react";

export const useThemeGenerator = (
  members: Member[],
  setMembers: (members: Member[]) => void
) => {
  const [theme, setTheme] = useState<string>("");
  const [category, setCategory] = useState<string>("Fictional Characters");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [generatedThemes, setGeneratedThemes] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const categories: Category[] = [
    {
      id: "fictional-characters",
      name: "Fictional Characters",
      icon: Users,
      description: "Characters from movies, TV shows, games, books",
      examples: ["The Sopranos", "Game of Thrones", "Grand Theft Auto V"],
      color: "bg-blue-300",
      disabledColor: "bg-blue-400",
      disabledHoverColor: "hover:bg-blue-300",
      enabledHoverColor: "hover:bg-blue-200",
      enabledBorderColor: "border-blue-200",
      disabledBorderColor: "border-blue-400",
    },
    {
      id: "real-people",
      name: "Real People",
      icon: Globe,
      description: "Historical figures, celebrities, and famous individuals",
      examples: ["Actors", "World Leaders", "Inventors"],
      color: "bg-purple-300",
      disabledColor: "bg-purple-400",
      disabledHoverColor: "hover:bg-purple-300",
      enabledHoverColor: "hover:bg-purple-200",
      enabledBorderColor: "border-purple-200",
      disabledBorderColor: "border-purple-400",
    },
    {
      id: "objects",
      name: "Objects",
      icon: Package,
      description:
        "Physical items and tangible things like products, food, etc",
      examples: ["Cars", "CS2 Skins", "Foods"],
      color: "bg-yellow-300",
      disabledColor: "bg-yellow-400",
      disabledHoverColor: "hover:bg-yellow-300",
      enabledHoverColor: "hover:bg-yellow-200",
      enabledBorderColor: "border-yellow-200",
      disabledBorderColor: "border-yellow-400",
    },
    {
      id: "places",
      name: "Places",
      icon: MapPin,
      description: "Cities, landmarks, and geographical locations",
      examples: ["New York", "Los Santos", "Sugar Land"],
      color: "bg-green-300",
      disabledColor: "bg-green-400",
      disabledHoverColor: "hover:bg-green-300",
      enabledHoverColor: "hover:bg-green-200",
      enabledBorderColor: "border-green-200",
      disabledBorderColor: "border-green-400",
    },
    {
      id: "abstract-concepts",
      name: "Abstract Concepts",
      icon: Brain,
      description: "Ideas, emotions, and philosophical concepts",
      examples: ["Life", "Quantum Mechanics", "Space"],
      color: "bg-pink-300",
      disabledColor: "bg-pink-400",
      disabledHoverColor: "hover:bg-pink-300",
      enabledHoverColor: "hover:bg-pink-200",
      enabledBorderColor: "border-pink-200",
      disabledBorderColor: "border-pink-400",
    },
  ];

  const getSortedMembers = (membersList: Member[]): Member[] => {
    const groupedMembers = membersList.reduce(
      (acc: Record<string, Member[]>, member) => {
        const highestRole = member.roles[0]?.name || "No Role";
        if (!acc[highestRole]) {
          acc[highestRole] = [];
        }
        acc[highestRole].push(member);
        return acc;
      },
      {}
    );

    const sortedRoles = Object.keys(groupedMembers).sort((a, b) => {
      const roleAPosition =
        membersList.find((m) => m.roles[0]?.name === a)?.roles[0]?.position ??
        -1;
      const roleBPosition =
        membersList.find((m) => m.roles[0]?.name === b)?.roles[0]?.position ??
        -1;
      return roleBPosition - roleAPosition;
    });

    return sortedRoles.flatMap((roleName) => groupedMembers[roleName]);
  };

  const handleGenerateCharacters = async (selectedMembers: Member[]) => {
    if (!selectedMembers || selectedMembers.length === 0) {
      alert("No members selected.");
      return;
    }

    if (!theme.trim()) {
      alert("Please enter a theme.");
      return;
    }

    setLoading(true);
    try {
      const numCharacters = selectedMembers.length;
      const characters = await characterGen(theme, category, numCharacters);
      setGeneratedThemes(characters);

      const generatedNames = characters.split(",").map((name) => name.trim());

      const sortedSelectedMembers = getSortedMembers(selectedMembers);

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
      alert("Failed to generate themes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    category,
    categories,
    setCategory,
    theme,
    setTheme,
    loading,
    handleGenerateCharacters,
  };
};
