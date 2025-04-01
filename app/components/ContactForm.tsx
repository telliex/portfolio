'use client'

import { useState, useRef } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type'
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project description is required'
    }

    // Validate file if present
    if (file) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/gif',
      ]

      if (file.size > maxSize) {
        newErrors.file = 'File size must be less than 10MB'
      } else if (!allowedTypes.includes(file.type)) {
        newErrors.file =
          'Invalid file type. Allowed types: PDF, DOC, DOCX, TXT, JPG, PNG, GIF'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      // Append file if present
      if (file) {
        formDataToSend.append('file', file)
      }

      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: '',
      })
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Clear file error when new file is selected
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: '' }))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.name ? 'border-red-500' : 'border-zinc-300'
            } bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.email ? 'border-red-500' : 'border-zinc-300'
            } bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.projectType ? 'border-red-500' : 'border-zinc-300'
          } bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100`}
        >
          <option value="">Select a project type</option>
          <option value="web">Web Application Development</option>
          <option value="mobile">Mobile App Development</option>
          <option value="api">API Development</option>
          <option value="ai">AI/ML Integration</option>
          <option value="web3">Web3/Blockchain Development</option>
          <option value="consulting">Technical Consulting</option>
          <option value="other">Other</option>
        </select>
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-500">{errors.projectType}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="budget"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Budget Range （TWD）
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.budget ? 'border-red-500' : 'border-zinc-300'
          } bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100`}
        >
          <option value="">Select a budget range</option>
          <option value="small">$5,000 - $10,000</option>
          <option value="medium">$10,000 - $25,000</option>
          <option value="large">$25,000 - $50,000</option>
          <option value="enterprise">$50,000+</option>
        </select>
        {errors.budget && (
          <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Project Description
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`mt-1 block w-full rounded-md border ${
            errors.message ? 'border-red-500' : 'border-zinc-300'
          } bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100`}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="file"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Attachment (Optional)
        </label>
        <div className="mt-1 flex items-center gap-4">
          <input
            type="file"
            id="file"
            name="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
            className={`block w-full rounded-md border ${
              errors.file ? 'border-red-500' : 'border-zinc-300'
            } bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100`}
          />
          {file && (
            <button
              type="button"
              onClick={() => {
                setFile(null)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
              }}
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              Remove
            </button>
          )}
        </div>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, GIF (max 10MB)
        </p>
        {errors.file && (
          <p className="mt-1 text-sm text-red-500">{errors.file}</p>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        {submitStatus === 'success' && (
          <p className="text-sm text-green-500">Message sent successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-sm text-red-500">
            Failed to send message. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
