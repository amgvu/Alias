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
      color: "bg-purple-500",
    },
    {
      id: "real-people",
      name: "Real People",
      icon: Globe,
      description: "Historical figures, celebrities, and famous individuals",
      examples: ["Actors", "World Leaders", "Inventors"],
      color: "bg-blue-500",
    },
    {
      id: "objects",
      name: "Objects",
      icon: Package,
      description:
        "Physical items and tangible things like products, food, etc",
      examples: ["Cars", "CS2 Skins", "Foods"],
      color: "bg-green-500",
    },
    {
      id: "places",
      name: "Places",
      icon: MapPin,
      description: "Cities, landmarks, and geographical locations",
      examples: ["New York", "Los Santos", "Sugar Land"],
      color: "bg-orange-500",
    },
    {
      id: "abstract-concepts",
      name: "Abstract Concepts",
      icon: Brain,
      description: "Ideas, emotions, and philosophical concepts",
      examples: ["Life", "Quantum Mechanics", "Space"],
      color: "bg-pink-500",
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
