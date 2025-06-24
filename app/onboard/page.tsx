'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import PageTransition from '@/components/page-transition';
import { artistCategories, languages, feeRanges } from '@/lib/data';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Upload, CheckCircle } from 'lucide-react';

// Enhanced form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(500, 'Bio too long'),
  category: z.array(z.string()).min(1, 'Please select at least one category').max(5, 'Maximum 5 categories'),
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  feeRange: z.string().min(1, 'Please select a fee range'),
  location: z.string().min(2, 'Location is required').max(100, 'Location too long'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number').regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone format'),
});

type FormData = z.infer<typeof formSchema>;

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const totalSteps = 3;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bio: '',
      category: [],
      languages: [],
      feeRange: '',
      location: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const result = await api.submitArtistApplication(data);
      
      if (result.success) {
        setIsSuccess(true);
        toast.success(result.message);
        // Reset form after successful submission
        setTimeout(() => {
          form.reset();
          setCurrentStep(1);
          setIsSuccess(false);
        }, 3000);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ['name', 'bio', 'email', 'phone'];
      case 2:
        return ['category', 'languages'];
      case 3:
        return ['feeRange', 'location'];
      default:
        return [];
    }
  };

  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  // Success state
  if (isSuccess) {
    return (
      <PageTransition className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <Card className="shadow-xl">
              <CardContent className="p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-4 text-green-600">Application Submitted!</h1>
                <p className="text-muted-foreground text-lg mb-6">
                  Thank you for joining ArtistHub. We&apos;ll  review your application within 24 hours and get back to you.
                </p>
                <div className="text-sm text-muted-foreground">
                  Redirecting to homepage in a few seconds...
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Join ArtistHub
          </h1>
          <p className="text-muted-foreground text-lg">
            Create your artist profile and start getting booked for events
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Step {currentStep} of {totalSteps}</CardTitle>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                          <p className="text-muted-foreground">Tell us about yourself</p>
                        </div>

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio * ({field.value?.length || 0}/500)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your experience, style, and what makes you unique..."
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h2 className="text-xl font-semibold mb-2">Skills & Languages</h2>
                          <p className="text-muted-foreground">What do you specialize in?</p>
                        </div>

                        <FormField
                          control={form.control}
                          name="category"
                          render={() => (
                            <FormItem>
                              <FormLabel>Categories * (Select all that apply, max 5)</FormLabel>
                              <div className="grid grid-cols-2 gap-4">
                                {artistCategories.map((category) => (
                                  <FormField
                                    key={category.id}
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => {
                                      return (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(category.name)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, category.name])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== category.name
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <div className="flex items-center space-x-2">
                                            <span className="text-lg">{category.icon}</span>
                                            <FormLabel className="text-sm font-normal">
                                              {category.name}
                                            </FormLabel>
                                          </div>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="languages"
                          render={() => (
                            <FormItem>
                              <FormLabel>Languages * (Select all that apply)</FormLabel>
                              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-4">
                                {languages.map((language) => (
                                  <FormField
                                    key={language}
                                    control={form.control}
                                    name="languages"
                                    render={({ field }) => {
                                      return (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(language)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, language])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== language
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {language}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h2 className="text-xl font-semibold mb-2">Pricing & Location</h2>
                          <p className="text-muted-foreground">Final details about your services</p>
                        </div>

                        <FormField
                          control={form.control}
                          name="feeRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fee Range *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your typical fee range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {feeRanges.map((range) => (
                                    <SelectItem key={range} value={range}>
                                      {range}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location *</FormLabel>
                              <FormControl>
                                <Input placeholder="City, State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        >
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-2">Profile Image (Optional)</p>
                          <p className="text-sm text-muted-foreground">Upload a professional photo</p>
                          <Button variant="outline" className="mt-4" type="button">
                            Choose File
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between pt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}