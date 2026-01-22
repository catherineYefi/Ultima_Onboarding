import React, { useState, useEffect } from 'react';
import { Copy, ChevronDown, ChevronUp, Check, FileText, Zap, AlertCircle } from 'lucide-react';

const SSMentorPromptV3 = () => {
  const [fullPrompt, setFullPrompt] = useState('');
  const [shortPrompt, setShortPrompt] = useState('');
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [isShortOpen, setIsShortOpen] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedShort, setCopiedShort] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка промптов при монтировании
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        // Загружаем промпты из публичной директории
        const [fullResponse, shortResponse] = await Promise.all([
          fetch(`${process.env.PUBLIC_URL}/prompts/ss-mentor-full-v3.md`),
          fetch(`${process.env.PUBLIC_URL}/prompts/ss-mentor-short-v3.md`)
        ]);

        if (!fullResponse.ok || !shortResponse.ok) {
          throw new Error('Не удалось загрузить промпты');
        }

        const fullText = await fullResponse.text();
        const shortText = await shortResponse.text();

        setFullPrompt(fullText);
        setShortPrompt(shortText);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки промптов:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadPrompts();
  }, []);

  // Копирование с fallback
  const copyToClipboard = async (text, setFunction) => {
    try {
      // Пытаемся использовать современный API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setFunction(true);
        setTimeout(() => setFunction(false), 2000);
      } else {
        // Fallback для старых браузеров или non-secure context
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setFunction(true);
            setTimeout(() => setFunction(false), 2000);
          } else {
            throw new Error('Копирование не удалось');
          }
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Не удалось скопировать. Попробуйте выделить текст вручную.');
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center gap-3 text-indigo-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-lg font-medium">Загрузка промптов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle size={24} />
          <h3 className="text-xl font-bold">Ошибка загрузки</h3>
        </div>
        <p className="text-red-700">{error}</p>
        <p className="text-red-600 mt-2 text-sm">
          Убедитесь что файлы промптов находятся в /public/prompts/
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
      {/* ЗАГОЛОВОК */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <FileText className="text-indigo-600" size={32} />
          ПРОМПТ: СС-НАСТАВНИК v3.0
        </h2>
        <p className="text-gray-600">
          Усиленная версия промпта для ИИ-помощника по подготовке презентации к СС
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            ✅ Реестр прогресса
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            ✅ Кросс-проверки
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
            ✅ Протоколы "ГОТОВО"
          </span>
        </div>
      </div>

      {/* ПОЛНАЯ ВЕРСИЯ */}
      <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText size={20} />
                Полная версия промпта
              </h3>
              <p className="text-indigo-100 text-sm mt-1">
                С протоколами, форматами вывода и кросс-проверками
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(fullPrompt, setCopiedFull)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              {copiedFull ? (
                <>
                  <Check size={18} />
                  Скопировано!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Копировать промпт
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => setIsFullOpen(!isFullOpen)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            {isFullOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            {isFullOpen ? 'Скрыть промпт' : 'Показать полный промпт'}
          </button>

          {isFullOpen && (
            <div className="mt-4">
              <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto max-h-96 overflow-y-auto border-2 border-indigo-100">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {fullPrompt}
                </pre>
              </div>
              <p className="mt-3 text-sm text-gray-600 italic">
                💡 Совет: Скопируйте промпт целиком и вставьте в начало разговора с ИИ-помощником
              </p>
            </div>
          )}
        </div>
      </div>

      {/* КРАТКАЯ ВЕРСИЯ */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap size={20} />
                Краткая версия промпта
              </h3>
              <p className="text-purple-100 text-sm mt-1">
                Для быстрого старта работы с ИИ-помощником
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(shortPrompt, setCopiedShort)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              {copiedShort ? (
                <>
                  <Check size={18} />
                  Скопировано!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Копировать промпт
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => setIsShortOpen(!isShortOpen)}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            {isShortOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            {isShortOpen ? 'Скрыть промпт' : 'Показать краткую версию'}
          </button>

          {isShortOpen && (
            <div className="mt-4">
              <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto max-h-96 overflow-y-auto border-2 border-purple-100">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {shortPrompt}
                </pre>
              </div>
              <p className="mt-3 text-sm text-gray-600 italic">
                ⚡ Краткая версия содержит все ключевые инструкции в сжатом виде
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ЧТО НОВОГО В v3.0 */}
      <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
        <h4 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
          <Zap className="text-green-600" size={20} />
          Что нового в v3.0:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-800">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✅</span>
            <span><strong>Реестр прогресса:</strong> ИИ ведёт таблицу 20/20 слайдов</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✅</span>
            <span><strong>Единый формат отчёта:</strong> структурированный вывод по каждому слайду</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✅</span>
            <span><strong>Кросс-проверки:</strong> 6 инвариантов согласованности данных</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✅</span>
            <span><strong>Протоколы "ГОТОВО":</strong> критерии для каждого слайда</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✅</span>
            <span><strong>Протокол "данных нет":</strong> последствия + чек-лист + суррогат</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✅</span>
            <span><strong>Требования артефактов:</strong> скрины, ссылки, файлы</span>
          </div>
        </div>
      </div>

      {/* ИНСТРУКЦИЯ */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
        <h4 className="font-bold text-indigo-900 mb-2">💡 Как использовать:</h4>
        <ol className="text-sm text-indigo-800 space-y-1 list-decimal list-inside">
          <li>Выбери версию промпта (полная или краткая)</li>
          <li>Нажми кнопку "Копировать промпт"</li>
          <li>Открой своего ИИ-помощника (ChatGPT, Claude, и т.д.)</li>
          <li>Вставь промпт <strong>в начало диалога</strong></li>
          <li>Загрузи шаблон презентации (20 слайдов)</li>
          <li>Следуй инструкциям ИИ-наставника</li>
        </ol>
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900">
          <strong>⚠️ Важно:</strong> Используй промпт ТОЛЬКО со <strong>новым шаблоном</strong> (20 слайдов)!
          Для старого шаблона (17 слайдов) используй старую версию.
        </div>
      </div>
    </div>
  );
};

export default SSMentorPromptV3;
