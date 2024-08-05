export const difficulté = [
    { value: 'سهل', label: 'سهل' },
    { value: 'متوسط', label: 'متوسط' },
    { value: 'صعب', label: 'صعب' }
]

export const BrouillonData = [
    { value: 'Publiée', label: 'Publiée' },
    { value: 'Non Publiée', label: 'Non Publiée' },
    { value: 'Programmée', label: 'Programmée' },
    { value: 'Brouillon', label: 'Brouillon' },
    { value: 'Masquée', label: 'Masquée' }
]

export const hour = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hourString = String(i).padStart(2, '0')
      hours.push({ value: i, label: hourString + '-H' })
    }
    return hours;
  }

export const unitéData = [
    { value: 'دسل', label: 'دسل' },
    { value: 'مليلتر', label: 'مليلتر' },
    { value: 'غرام', label: 'غرام' },
    { value: 'كغ', label: 'كغ' },
    { value: 'ل', label: 'ل' },
    { value: 'أوراق', label: 'أوراق' },
    { value: 'حفنة', label: 'حفنة' },
    { value: 'راس', label: 'راس' },
    { value: 'ربطة', label: 'ربطة' },
    { value: 'رشة', label: 'رشة' },
    { value: 'عرف', label: 'عرف' },
    { value: 'فصوص', label: 'فصوص' },
    { value: 'قطرات', label: 'قطرات' },
    { value: 'قطع', label: 'قطع' },
    { value: 'ڨرن', label: 'ڨرن' },
    { value: 'ڨرون', label: 'ڨرون' },
    { value: 'كعبات', label: 'كعبات' },
    { value: 'كعبة', label: 'كعبة' },
    { value: 'كوب', label: 'كوب' },
    { value: 'مغرفة صغيرة', label: 'مغرفة صغيرة'},
    { value: 'مغرفة كبيرة', label: 'مغرفة كبيرة' }
]

export const ingredientData = [
    { value: 'سهل', label: 'سهل' },
    { value: 'متوسط', label: 'متوسط' },
    { value: 'صعب', label: 'صعب' }
]